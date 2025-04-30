import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from '../services/operations/authAPI'
import { BiArrowBack } from "react-icons/bi";

const ForgotPassword = () => {
    const [emailSent , setEmailSent] = useState(false)
    const [email , setEmail] = useState("")
    const {loading} = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        //here email bhjte hi we want ki check ur email wala pg aa 
        // jye for that the flag value emailsent must be true(changed) nd pg is shown
        dispatch(getPasswordResetToken(email , setEmailSent))
    }
  return (
    <div className='w-full h-screen text-white flex justify-center items-center '>
      {
        loading ? (<div>Loading...</div>) : 
        (
        <div className='w-[30%] space-y-4'>
            <h1 className='font-bold text-3xl'>
                {
                    !emailSent ? "Reset your Password" : "Check your Email"
                }
            </h1>

            <p className='text-richblack-100 text-md ]' >
               {
                    !emailSent ? "Have no fear. We’ll email you instructions to reset your password.If you dont have access to your email we can try account recovery"
                     : `We have sent the reset email to ${email}`
                }
            </p>

            <form onSubmit={handleOnSubmit} className='flex flex-col space-y-4'>
               {
                !emailSent  && (
                    <label className='space-y-3'>
                        <p className='text-richblack-5'>Email Address<span className='text-pink-200 p-1'>*</span></p>
                        <input
                            required
                            type='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your Email Address'
                            className='text-richblack-5 bg-richblack-800 w-full p-3 rounded-lg'
                        />   
                    </label>
                )
               }

               <button type='submit' className='bg-yellow-50 text-black p-4 rounded-lg mt-5'>
                  {
                    !emailSent ? "Reset Password" : "Resend Email"
                  }
               </button>
            </form>

            <div className='flex flex-row items-center gap-2'>
            <BiArrowBack />
                <Link to="/login">
                  <p>
                    Back to login
                  </p>
                </Link>
            </div>
        </div>
        )
      }
      
    </div>
  )
}

export default ForgotPassword
