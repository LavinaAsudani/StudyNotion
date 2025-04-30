import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/CTAButton';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from "../components/core/HomePage/InstructorSection"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"

const Home = () => {
  return (
    <div>
      {/* Section-1 */}

      <div className='relative mx-auto w-11/12 flex flex-col items-center max-w-maxContent 
       justify-between text-white'>
         
            <Link to={"/signup"}>
            <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 
            transition-all duration-200 hover:scale-95 w-fit shadow-sm shadow-richblack-500'>
                    <div className='flex flex-row items-center gap-2 rounded-full 
                    px-10 py-[5px] group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
            </div>

            </Link>
         
            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with 
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className='mt-4 w-[90%] mx-auto text-center text-lg font-bold text-richblack-300'>
            With our online coding courses, you can learn at your own pace, 
            from anywhere in the world, and get access to a wealth of resources, 
            including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>
         
            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            
            </div>
            
             <div className=' relative mx-3 my-12 shadow-[13px_13px_0px_rgba(255,255,255,1)]'>
              {/* <div className='absolute top-[-2px] left-4 bg-gradient-to-r from-white to-white 
              rounded-full shadow-2xl blur-xl'></div> */}
                <video
                muted
                autoPlay
                loop>
                    <source src={Banner} type='video/mp4'/>
                </video>
            </div>

           {/* Code section 1*/}
            <div className='w-full'>
                <CodeBlocks 
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock your 
                            <HighlightText text={"coding potential "}/>
                              with our online courses
                        </div>
                    }
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

                    ctabtn1={
                        {
                            btnText:"Try it Yourself",
                            linkto:"/signup",
                            active:true,
                        }
                    }

                    ctabtn2={{
                        btnText:"Learn More",
                        linkto:"/login",
                        active:false,
                    }}

                    codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example\n</title><linkrel="stylesheet"href="styles.css">\n</head>
                    <body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one/">One</a><a href="two/">Two\n</a><a href="three/">Three</a>\n</nav>`}

                    codeColor={"text-yellow-25"}

                    backgroundGradient={"bg-gradient-to-r from-orange to-orangish-5 "}
                />
            </div>

            {/* Code section 2 */}
            <div>
                <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-semibold'>
                           Start
                            <HighlightText text={"coding in seconds"}/>
                        </div>
                    }
                    subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}

                    ctabtn1={
                        {
                            btnText:"Continue Lesson",
                            linkto:"/signup",
                            active:true,
                        }
                    }

                    ctabtn2={{
                        btnText:"Learn More",
                        linkto:"/login",
                        active:false,
                    }}

                    codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example\n</title><linkrel="stylesheet"href="styles.css">\n</head>
                    <body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one/">One</a><a href="two/">Two\n</a><a href="three/">Three</a>\n</nav>`}

                    codeColor={"text-white"}

                    backgroundGradient={"bg-gradient-to-r from-blue-500 to-green-500"}
                />
            </div>
          
          <ExploreMore/>
      </div>

      {/* Section-2 */}

      <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[350px]'>
              <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-between'>

              <div className='h-[220px]'></div>

                 <div className='flex flex-row gap-7 text-white'>
                    <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex gap-3 items-center'>
                       Explore Full Catalog
                       <FaArrowRight/>
                    </div>
                    </CTAButton>

                    <CTAButton active={false} linkto={"/login"}>
                       <div>
                           Learn More
                       </div>
                    </CTAButton>
                 </div>


              </div>
            </div>

            <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-between'>
                <div className='flex flex-row gap-5 justify-between mb-10 mt-[95px]'>
                    <div className='text-4xl font-semibold w-[45%]'>
                        Get the skills you need for a 
                        <HighlightText text={"job that is in demand"}/>
                    </div>

                    <div className='flex flex-col gap-5 w-[40%] items-start'>
                        <p className='text-[16px]'>
                        The modern StudyNotion is the dictates its own terms. 
                        Today, to be a competitive specialist requires more than professional skills.
                        </p>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div>
                                Learn More
                            </div>
                        </CTAButton>
                    </div>
                </div>

                <TimelineSection/>

                <LearningLanguageSection/>

            </div>

           
      </div>

      {/* Section-3 */}
      <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between 
      gap-8 bg-richblack-900 text-white'>
        <InstructorSection/> 

        <h2 className='text-center text-4xl font-semibold mt-10'>
               Review From other Learners
        </h2>

        <ReviewSlider/>

      </div>

      {/* Footer */}
      
         <Footer/>
     
      
    </div>
  )
}

export default Home
