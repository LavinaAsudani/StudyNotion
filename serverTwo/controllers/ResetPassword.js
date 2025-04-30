const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

exports.resetPasswordToken=async( req , res)=>{
	try{
	  //get email from req body
	  const {email}=req.body
	  //check user for email
	  const user=await User.findOne({email})
	  if(!user){
		  return res.json({
			  success:false,
			  message:`This Email: ${email} is not Registered With Us...Enter a Valid Email `,
		  })
	  }
	  // generate  token
	  const token=crypto.randomUUID()
	  //update user by adding token and expiry 
	  const updatedDetails=await User.findOneAndUpdate({email:email},
									  {
									  token:token,
									  resetPasswordExpires:Date.now() + 5*60*1000,
									   },{new:true}
									  );
  
	  console.log("DETAILS", updatedDetails);
	  //create url
  
	  const url=`http://localhost:3000/update-password/${token}`
	  //send mail with url
	  await mailSender(email,"Password Reset",
		  `Your Link for email verification is ${url}. Please click this url to reset your password.`)
	  //return response
	  return  res.json({
		success:true,
		message:"Email Sent Successfully, Please Check Your Email to Continue Further"
	   })
		
  
	}catch(error){
	  console.log(error);
	  return res.status(500).json({
		success:false,
		message:"Something went Wrong while sending Reset Password Email "
	  })
	}
  }
  
  
exports.resetPassword = async (req, res) => {
	try {
		const { password, confirmPassword, token } = req.body;

		 //validation on data
		 if(!token || !password || !confirmPassword){
			return res.status(403).json({
			  success:false,
			  message:"Please enter all fields Carefully"
			})
		  } 

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		//on basis of token find user in db
		const userDetails = await User.findOne({ token: token });
		 // if no entry--- ie invalid token
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}
		 // --time expires of token
		if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};