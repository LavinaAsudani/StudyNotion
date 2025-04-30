import React from 'react'
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BiWorld } from "react-icons/bi";
import { IoCall } from "react-icons/io5";


const ContactDetails = () => {
  return (
    <div className='w-[90%] h-fit bg-richblack-800 flex flex-col gap-8 p-5 rounded-xl'>
       <div>
          <div className='flex flex-row gap-3 items-center'>
            <HiChatBubbleLeftRight fontSize={25} className='text-richblack-100'/>
            <h1 className='text-lg font-semibold text-richblack-5'>Chat on us</h1>
          </div>
          <p className='ml-8 font-medium text-richblack-200 mb-1'>Our friendly team is here to help.</p>
          <p className='ml-8 font-semibold text-richblack-200'>info@studynotion.com</p>
       </div>

       <div>
          <div className='flex flex-row gap-3 items-center'>
            <BiWorld fontSize={25} className='text-richblack-100'/>
            <h1 className='text-lg font-semibold text-richblack-5'>Visit us</h1>
          </div>
          <p className='ml-8 font-medium text-richblack-200 mb-1'>Come and say hello at our office HQ.</p>
          <p className='ml-8 font-semibold text-richblack-200'>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</p>
       </div>

       <div>
          <div className='flex flex-row gap-3 items-center'>
            <IoCall fontSize={25} className='text-richblack-100'/>
            <h1 className='text-lg font-semibold text-richblack-5'>Call us</h1>
          </div>
          <p className='ml-8 font-medium text-richblack-200 mb-1'>Mon - Fri From 8am to 5pm</p>
          <p className='ml-8 font-semibold text-richblack-200'>+123 456 7869</p>
       </div>
       
        
    </div>
  )
}

export default ContactDetails
