import React from 'react'
import HighlightText from "../components/core/HomePage/HighlightText"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from "../components/core/AboutPage/Quote"
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from "../components/common/Footer"
import ReviewSlider from '../components/common/ReviewSlider'

const About = () => {
  return (
    <div className= 'bg-richblack-900'>
      <div className='relative  justify-between gap-10 text-white  flex flex-col'>
         {/* section-1 */}
       
           <div className=' bg-richblack-800 '>
               <div className=' mx-auto w-11/12 max-w-maxContent'>
                <header className='text-4xl font-semibold text-center mx-auto py-20 lg:w-[70%]'>Driving Innovation in Online Education for a
                    <HighlightText  text={"Brighter Future"}></HighlightText>

                    <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[90%]">Studynotion is at the forefront of driving innovation in online education. 
                    We're passionate about creating a brighter future by offering cutting-edge courses, 
                    leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    </header>
                    <div className="sm:h-[70px] lg:h-[150px]"></div>
                    <div  className='absolute top-[10%] flex gap-3 lg:gap-5'>
                        <img src={BannerImage1}></img>
                        <img src={BannerImage2}></img>
                        <img src={BannerImage3}></img>
                    </div>
               </div>
           </div>
      

            {/* section-2 */}
           
           <div className='mx-auto w-11/12 max-w-maxContent'>
               <div className='h-[200px] w-full'></div>
            <section  >
                <div className="text-4xl mt-4 font-semibold max-w-[95%] mx-auto text-center leading-14">
                    
                       <Quote/>
                   
                </div>
            </section>
            
                {/* section-3 */}
            <section className='mt-40'>
                    <div className='flex flex-col gap-48'>
                    {/* first component */}
                        <div className='flex gap-20 items-center'>
                        {/* left box */}
                            <div className='w-[45%]'>
                                <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text 
                                text-4xl font-semibold text-transparent lg:w-[70%] mb-3">Our Founding Story </h1>
                                <p className="text-base font-medium text-richblack-300 lg:w-[90%] mb-4">Our e-learning platform was born out of a shared vision and passion for transforming education.
                                It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, 
                                flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                                <p className="text-base font-medium text-richblack-300 lg:w-[90%]">
                                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems.
                                We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. 
                                We envisioned a  platform that could bridge these gaps and empower individuals from all walks of life 
                                to unlock their full potential.
                                </p>
                            </div>
                            {/* right box */}
                            <div className='w-fit shadow-[0_0_20px_0] shadow-[#FC6767]  h-fit'>
                                <img src={FoundingStory}/>
                            </div>
                        </div>

                        {/* second component */}
                        <div className='flex gap-20 items-center justify-between mb-9'>
                            {/* left box */}
                            <div className='flex flex-col gap-4'>
                                <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]">
                                    <span>Our Vision</span>
                                </h1>
                                <p className="text-base font-medium text-richblack-300 lg:w-[95%]">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the
                                way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that 
                                combines cutting-edge technology with engaging content, 
                                fostering a dynamic and interactive learning experience.</p>
                            </div>
                            {/* right box */}
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-4xl font-semibold text-transparent lg:w-[70%]'>
                                    <HighlightText text={"Our Mission"}/>
                                </h1>
                                <p className="text-base font-medium text-richblack-300 lg:w-[95%]">our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, 
                                where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an 
                                environment of sharing and dialogue, and we foster this spirit of collaboration through forums, 
                                live sessions, and networking opportunities.</p>
                            </div>
                        </div>
                    </div>
            </section>
           </div>

            {/* section-4 */}
            <StatsComponent/>

            {/* section-5 */}
            <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
                <LearningGrid/>
                <ContactFormSection/>
            </section>
        
            {/* section-6 */}
            <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
                    <div  className="text-center text-4xl font-semibold mt-8">
                        Reviews From other Learners
                    </div>
                    <ReviewSlider/>
            </section>

           
            </div>
            <Footer/>
        </div>
    
  )
}

export default About
