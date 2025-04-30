import React from 'react'
import ContactForm from '../components/core/ContactPage/ContactForm'
import ContactDetails from '../components/core/ContactPage/ContactDetails'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'


const Contact = () => {
  return (
    <div>
        <div className='w-11/12 max-w-maxContent mx-auto mt-20'>
          <div className='flex flex-col justify-between gap-10 text-white lg:flex-row'>
               {/* left part */}
                <div className="lg:w-[40%]">
                    <ContactDetails />
                </div>
                {/* right part */}
                <div  className="lg:w-[60%]">
                    <ContactForm/>
                </div>
            </div>

          <div className="relative my-20 flex flex-col 
            items-center justify-between gap-8 bg-richblack-900 text-white">
                <h1 className="text-center text-4xl font-semibold mt-8">Reviews from other learners</h1>
                <ReviewSlider/>
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Contact
