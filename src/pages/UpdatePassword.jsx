import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiFillEyeInvisible , AiFillEye } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { resetPassword } from '../services/operations/authAPI';
import { BiArrowBack } from "react-icons/bi";

const UpdatePassword = () => {

    const [formData , setFormData] = useState ({
        password:"",
        confirmPassword:""
    })
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const[showPassword , setShowPaassword] = useState(false)
    const[showConfirmPassword , setShowConfirmPaassword] = useState(false)
    const {loading} = useSelector((state) => state.auth)
    const {password , confirmPassword} = formData
    
    const handleOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData ,
                [e.target.name] : e.target.value,
            }
        ))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const token= location.pathname.split("/").at(-1);
        dispatch(resetPassword(password , confirmPassword , token , navigate))

    }
  return (
    <div className='w-full h-screen text-white flex justify-center items-center '>
      {
        loading ? (<div>Loading...</div>) : (
            <div className='w-[30%] space-y-4'>
                <h1 className='font-bold text-3xl'>Choose  new password</h1>
                <p className='text-richblack-100 text-md'>Almost done. Enter your new password and youre all set.</p>
                <form onSubmit={handleOnSubmit} className='flex flex-col space-y-6'>
                    <label className='space-y-3 '>
                        <p className='text-richblack-5'>New password <sup className='text-pink-200  text-lg'>*</sup></p>
                        <input
                            required
                            type={ showPassword ? "text" : "password"}
                            name='password'
                            value={password}
                            onChange={handleOnChange}
                            placeholder='Password'
                            className='text-richblack-5 bg-richblack-800 w-full p-3 rounded-lg relative'
                        />
                        <span onClick={() => setShowPaassword((prev) => !prev)} className='absolute top-[48%] left-[63%]'>
                            {
                                showPassword ? <AiFillEyeInvisible  fontSize={24}/> : <AiFillEye fontSize={24} />
                            }
                        </span>
                    </label>

                    <label className='space-y-3'>
                        <p className='text-richblack-5'>Confirm New password <sup className='text-pink-200  text-lg'>*</sup></p>
                        <input
                            required
                            type={ showConfirmPassword ? "text" : "password"}
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleOnChange}
                            placeholder='Confirm Password'
                            className='text-richblack-5 bg-richblack-800 w-full p-3 rounded-lg relative'
                        />
                        <span onClick={() => setShowConfirmPaassword((prev) => !prev)} className='absolute top-[62%] left-[63%]'>
                            {
                                showConfirmPassword ? <AiFillEyeInvisible  fontSize={24}/> : <AiFillEye fontSize={24} />
                            }
                        </span>
                    </label>

                    <button type='submit' className='bg-yellow-50 text-black p-4 rounded-lg mt-24 '>
                        Reset Password
                    </button>
                </form>

                <div >
                <Link to="/login" className='flex flex-row items-center gap-2'>
                  <BiArrowBack />
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

export default UpdatePassword
