const RatingAndReview=require("../models/RatingAndReview")
const Course=require("../models/Course")


//createRating
exports.createRating= async(req , res)=>{
    try{
        //get user id
        const userId=req.user.id;
        //fetch data from req body
        const {rating,review,courseId}=req.body
        //verify if user is enrolled or not---if enrolled thn  can review else not
        const courseDetails=await Course.findOne(
                                             {
                                              _id:courseId,
                                               studentsEnrolled:{$elemMatch:{$eq:userId}}
                                             }, 
       ) 
       if(!courseDetails){
        return res.status(404).json({
            success:false,
            message:"Student is not enrolled in the Course"
        })
       }

        //check user not already reviewed the course
       const alreadyReviewed = await RatingAndReview.findOne( {
                                              user:userId,
                                              course:courseId,
       });

       if(alreadyReviewed){
        
        return res.status(403).json({
            success:false,
            message:"Course is already reviewed by the user"
        })
       }

        //create rating review
        const ratingReview=await RatingAndReview.create({
            rating,
            review,
            course:courseId,
            user:userId
        })

        //update course -->rating review array me add
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
            {
                $push:{
                    ratingAndReviews:ratingReview._id,
                }
            },
            {new:true}
        );
        console.log(updatedCourseDetails);

        //return response
         return res.status(200).json({
            success:true,
            message:"Rating and Review Created Successfully ",
            ratingReview,
         })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//getAverageRating
exports.getAverageRating = async(req , res) => {
    try{
        //get course id
        const courseId=req.body.courseId

        //find average

       const result=await RatingAndReview.aggregate([
        //criteria-i.e find aggregate on basis of
        { //in all rating review --find for the courseId matched
            $match:{
                course:new mongoose.Types.ObjectId(courseId),
            },
        },
        { //grp thm together --no criteria to group so _id=null is used
            $group:{
                _id:null,
                averageRating:{$avg:"$rating"},
            }
        },
       ]) 

       //return rating
       if(result.length > 0){
        return res.status(200).json({
            success:true,
            averageRating:result[0].averageRating, //averageRating here is key
         })
       }
       //if no rating is found
       return res.status(200).json({
        success:true,
        message:"Average rating is 0",
        averageRating:0,
     })


    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//getAllRatingAndReviews-->all rating and reviews(not on basis of course)

exports.getAllRatingAndReviews = async(req , res) =>{
    try{
        const allReviews=await RatingAndReview.find({})
                                                .sort({rating:-1})
                                                .populate({
                                                    path:"user",
                                                    select:"firstName lastName email image"
                                                })
                                                .populate({
                                                    path:"course",
                                                    select:"courseName"
                                                })
                                                .exec();
        return res.status(200).json({
            success:true,
            message:"All reviews fetched Successfully",
            data:allReviews,
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}