import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto flex flex-col '>
      <h1 className='text-4xl text-center font-semibold '>Get in Touch</h1>
      <p className='font-medium text-center text-richblack-300 mt-3'>We’d love to here for you, Please fill out this form.</p>
      <div className="mt-12 ">
        <ContactUsForm/>
      </div>
    </div>
  )
}

export default ContactFormSection
