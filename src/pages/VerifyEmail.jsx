import React, { useState } from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux'
import { sendOtp, signUp } from '../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";


const VerifyEmail = () => { 
    const [otp , setOtp] = useState("")
    const dispatch = useDispatch()
    const navigate= useNavigate()
    const {signupData , loading} = useSelector((state) => state.auth)

    useEffect(() => {
        if(!signupData){
            navigate("/signup")
        }
    },[])

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData
        dispatch(signUp(accountType , firstName , lastName , email , password , confirmPassword , otp , navigate))
    }
  return (
    <div className='w-full h-screen text-white flex justify-center items-center '>
      {
        loading ? (<div>Loading...</div>) 
        :
        (<div className='w-[29%] space-y-4'>
            <h1 className='font-bold text-3xl'>Verify email</h1>
            <p className='text-richblack-100 text-lg'>A verification code has been sent to you. Enter the code below</p>
            <form onSubmit={handleOnSubmit} className='flex flex-col space-y-4'>
                <OTPInput 
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span className="mx-1"></span>}
                    renderInput={(props) => (
                        <input {...props} 
                        placeholder='-'
                         className='bg-richblack-800  text-xl text-center border border-richblack-600 
                        rounded-md focus:outline-none focus:border-yellow-500'
                       style={{
                    width: "60px",  // Set custom width
                    height: "55px", // Set custom height
                    fontSize: "24px", // Increase font size
                    textAlign: "center", }}
                       />
                    )}
                    containerStyle="flex w-full justify-between items-center"
                   
                />
                <button type='submit' className='bg-yellow-50 text-black p-4 rounded-lg w-full'>
                    Verify Email
                </button>
            </form>

            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center gap-2'>
                     <BiArrowBack />
                    <Link to="/login">
                    <p>
                        Back to login
                    </p>
                    </Link>
                </div>

                <button onClick={() => dispatch(sendOtp(signupData.email , navigate))} 
                className='flex flex-row items-center gap-2 text-blue-100'>
                <RxCountdownTimer />
                    Resent it
                </button>
            </div>
        </div>)
      }
    </div>
  )
}

export default VerifyEmail
