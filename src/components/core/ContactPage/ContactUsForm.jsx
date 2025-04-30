import React from 'react'
import { useState ,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import CountryCode from "../../../data/countrycode.json"
import {apiConnector} from "../../../services/apiconnector"
import {contactusEndpoint} from "../../../services/apis"
import { toast } from "react-hot-toast"

const ContactUsForm = () => {
  const [loading , setLoading] = useState(false)
 
 
  const {
    register,
    handleSubmit,
    reset,
    formState : {errors , isSubmitSuccessful}
  } = useForm();

  const submitContactForm = async(data) => {
    

    try {
      // console.log("logg data" , data)
      setLoading(true)
     
     
      const res = await apiConnector(
        "POST",
         contactusEndpoint.CONTACT_US_API,
        data
      )
      console.log("Email Res - ", res)
      toast.success(res.data.message)
      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }


  useEffect( () => {
    if(isSubmitSuccessful){
      reset({
        email:"", 
        firstname:"",
        lastname:"",
        message:"",
        phoneNo:""
      })
    }
  },[reset , isSubmitSuccessful] )


  return (
    <form onSubmit={handleSubmit(submitContactForm)} className="flex flex-col gap-7">
      <div className='flex flex-col gap-5 justify-center'>
            <div className='flex  gap-5 '>
                {/* firstname */}
                <div className=' flex flex-col w-[50%]'>
                    <label htmlFor='firstname' className="mb-2">First Name</label>
                    <input 
                        type='text' 
                        name='firstname' 
                        id='firstname' 
                        className='text-richblack-5 bg-richblack-800 p-3 rounded-lg'
                        placeholder='Enter first name'
                          {...register("firstname" , {required:true})}
                        />
                        {
                          errors.firstname && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">Please Enter Your first name</span>
                          )
                        }
                </div>
                {/* lastname */}
                <div className=' flex flex-col w-[50%]'>
                <label htmlFor='lastname' className="mb-2">Last Name</label>
                <input 
                    type='text' 
                    name='lastname' 
                    id='lastname' 
                      className='text-richblack-5 bg-richblack-800  p-3 rounded-lg'
                    placeholder='Enter last name'
                      {...register("lastname")}
                    />
                    {
                      errors.firstname && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Please Enter Your last name</span>
                      )
                    }
            </div>
            </div>

           {/* email */}
            <div className='flex flex-col'>
              <label htmlFor='email' className="mb-2">Email Address</label>
              <input 
                type='email'
                name='email'
                id='email'
                 className='text-richblack-5 bg-richblack-800  p-3 rounded-lg'
                placeholder='Enter email address'
                {...register("email" , {required:true})}
              />

              {
                errors.email && (
                  <span className="ml-2 text-xs tracking-wide text-pink-200">Please Enter your Email Address</span>
                )
              }
            </div>

            {/* Phone no */}
            <div className='flex flex-col gap-x-10  '>
              <label htmlFor='phoneNo' className="mb-2">Phone Number</label>
              <div className='flex flex-row gap-5'>

                  {/* dropdown */}
                  <div className='flex flex-col w-[80px] gap-2'>
                    <select className='text-richblack-5 bg-richblack-800  p-3 rounded-lg'
                        name='dropdown' 
                        id='dropdown' 
                        {...register("countrycode" , {required:true})}
                        >
                        {
                          CountryCode.map ((element , index) => {
                            return (
                              <option key={index} value={element.code}>
                                {element.code} - {element.country}
                              </option>
                            )
                          })
                        }
                    </select>
                  </div>

                  <div className='flex flex-col w-[calc(100%-90px)] gap-2'>
                    <input
                      type='number'
                      name='phonenumber'
                      id='phonenumber'
                      placeholder='12345 67890'
                      className='text-richblack-5 bg-richblack-800  p-3 rounded-lg'
                      {...register("phoneNo" , 
                                        {
                                          required:{value:true , message:"Please enter Phone Number"},
                                          maxLength:{value:10 , message:"Invalid Phone Number"},
                                          minLength:{value:8 , message:"Invalid Phone Number"}
                                          })
                      }
                    />
                    {
                      errors.phoneNo && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                          {errors.phoneNo.message}
                        </span>
                      )
                    }

                  </div>
              </div>
            </div>

            {/* message box */}
            <div className='flex flex-col'>
              <label htmlFor='message' className="mb-2">Message</label>
              <textarea 
                name='message'
                id='message'
                cols="30"
                rows="7"
                 className='text-richblack-5 bg-richblack-800 p-3 rounded-lg'
                placeholder='Enter Your message here'
                {...register("message" , {required:true})}
              />
              {
                errors.message && (
                  <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Please enter your  message
                  </span>
                )
              }
            </div>

            <button disabled={loading}
                  type="submit"
                  className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                  ${
                    !loading &&
                    "transition-all duration-200 hover:scale-95 hover:shadow-none"
                  }  disabled:bg-richblack-500 sm:text-[16px] `}
                  >
                  Send Message
            </button>
      </div>

    </form>
  )
}

export default ContactUsForm
