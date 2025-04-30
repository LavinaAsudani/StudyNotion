import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/StudentFeaturesAPI';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"
import ConfirmationModal from "../components/common/ConfirmationModal"
import RatingStars from "../components/common/RatingStars"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import {formatDate} from "../services/formatDate"
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import { formatTime } from '../utils/formatTime';
import CourseSectionAccordion from '../components/core/Course/CourseSectionAccordion';
import { BsDot } from "react-icons/bs";
import Footer from "../components/common/Footer"
import ReviewSlider from '../components/common/ReviewSlider';

const CourseDetails = () => {

  const {user} = useSelector((state) => state.profile)
  const {token} = useSelector((state) => state.auth)
  const {loading} = useSelector((state) => state.profile)
  const {paymentLoading} = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {courseId} = useParams()
  const[response , setResponse] = useState(null)
  const [confirmationModal , setConfirmationModal]= useState(null)
    
  useEffect(() => {
    const getCourseFullDetails = async() => {
      try{
        const result = await fetchCourseDetails(courseId)
        console.log("RESULT----------",result)
        
        setResponse(result);
        
      }catch(error){
        console.log(error)
        console.log("Could not fetch course Details")
      }
    }
    getCourseFullDetails()
  },[courseId])

    const [avgReviewCount , setAverageReviewCount] = useState(0)
    useEffect(() => {
        const count = GetAvgRating(response?.data?.[0].ratingAndReviews || [])
        setAverageReviewCount(count)
    },[response])
    

    const [totalNoOfLectures,setTotalNoOfLectures] = useState(0)

    useEffect(()=> {
      let lectures=0;
      response?.data?.[0].courseContent?.forEach((sec) => {
        lectures += sec.subSection.length || 0 
      })
      setTotalNoOfLectures(lectures);
    },[response])
     
    
    const [sectionDurations, setSectionDurations] = useState([]); // Stores total duration for each section
    const [totalDuration, setTotalDuration] = useState(0); // Stores overall duration
    
    useEffect(() => {
      if (!response?.data?.[0]?.courseContent) return;
    
      let total = 0;
      const durations = response.data[0].courseContent.map((section) => {
        const sectionTotal = section.subSection.reduce((acc, sub) => {
          const time = Number(sub.timeDuration); 
          return acc + time;
        }, 0);
        total +=  sectionTotal;
        // return { sectionId: section.id, duration: sectionTotal };
      });
    
      setSectionDurations(durations);
      setTotalDuration(total);
    }, [response]); 
      

    const [isActive , setIsActive] = useState(Array(0))

   const handleActive = (id) => {
        setIsActive(
          !isActive.includes(id) ?
           isActive.concat(id)
           : isActive.filter((e) => e !== id)
        )
   }
    
    const handleBuyCourse = () => {
        if(token){
            buyCourse(token , [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
          text1:"You are not Logged in",
          text2:"Please Login to purchase the Course",
          btn1Text:"Login",
          btn2Text:"Cancel",
          btn1Handler:() => navigate("/login"),
          btn2Handler:() =>setConfirmationModal(null)
        })
    }

    if(loading || !response){
      return (
        <div className='spinner'></div>
      )
    }

    if(!response.success){
      return (
        <div>
          <Error/>
        </div>
      )
    }
   
  
  return (
    
    <div> 
          
         
       <div className='text-richblack-5 bg-richblack-800 min-h-[24rem] flex flex-col '>
          <div className='ml-36  '>
              <div className='mt-14 flex flex-col space-y-2'>
                  <div className=' text-md text-richblack-200'>{`Home / Learning /`}
                      <span className='text-yellow-50'>{` ${response?.data?.[0].category?.name}`}</span>
                    </div>
                  <p className='text-2xl font-bold text-richblack-5 sm:text-[42px] w-[60%] leading-[45px] '>{` ${response?.data?.[0].courseName}`}</p>
                    <p className='text-richblack-200 w-[60%] leading-[25px]'>{` ${response?.data?.[0].courseDescription}`}</p>
                    <div className='flex gap-x-3 items-center'>
                        <span className='text-yellow-50'>{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount}/>
                        <span className=' md:block hidden md:text-xl text-richblack-5'>({`${response?.data?.[0].ratingAndReviews.length}`} ratings)</span>
                        <span  className='text-richblack-200'>{`${response?.data?.[0].studentsEnrolled.length}`} students</span>
                    </div>
                    <div>
                      Created by {`${response?.data?.[0].instructor.firstName}`} {`${response?.data?.[0].instructor.lastName}`}
                    </div>
                    <div className='flex flex-wrap gap-4 text-lg'>
                            <BiInfoCircle className='text-2xl text-richblack-5' />
                            <p className='text-richblack-50'>Created at &nbsp;    
                            {formatDate(response?.data?.[0].createdAt)}
                            </p>
                            <p className='flex items-center gap-2 text-richblack-50'><HiOutlineGlobeAlt className='text-lg text-richblack-50'/>English</p>
                        </div>

              </div>
          </div>
       </div>
       {/* CourseCard */}
       <div className="absolute top-[16%] right-[8%] shadow-[#161D29_0px_-64px_36px_-28px_inset] ">
          <CourseDetailsCard 
          course={response?.data?.[0]} 
          setConfirmationModal={setConfirmationModal} 
          handleBuyCourse={handleBuyCourse}/>
       </div>
       <div className='flex flex-col ml-36 my-8 border border-richblack-600 p-8 text-richblack-5 max-w-[53%]'>
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5 text-richblack-50">{` ${response?.data?.[0].whatYouWillLearn}`}</div>
       </div>
       <div className='ml-36 text-richblack-25 max-w-[830px] flex flex-col gap-3'>
          <div>
              <p className="text-[28px] font-semibold">Course Content</p>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
               <div className="flex gap-2">
                  <div className='flex items-center gap-1'>
                    <span className='text-'>{response?.data?.[0].courseContent.length} section(s) </span> 
                    <BsDot size={30}/>
                  </div>
                 <div className='flex items-center gap-1'>
                    <p>{totalNoOfLectures} lectures </p>
                    <BsDot size={30}/>
                 </div>
                 <div className='flex items-center gap-1'>
                    <p>{formatTime(totalDuration)}</p>  
                 </div>
               </div>
               <div>
                  <button className="text-yellow-25"
                      onClick={() => setIsActive([])}>
                      Collapse all sections
                  </button> 
               </div>
          </div>
       </div>
       {/* section Accordion */}
       <div className="py-4 ml-36 max-w-[55%] ">
          {
            response?.data?.[0].courseContent?.map((course , index) => (
              <CourseSectionAccordion
                key={index}
                course={course}
                isActive={isActive}
                handleActive={handleActive}
                sectionDurations={sectionDurations}
              />
            ))
          }
       </div>

       <div className="mb-12 py-4 ml-36 text-richblack-25 max-w-[830px]">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    response?.data?.[0].instructor.image
                      ? response?.data?.[0].instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${response?.data?.[0].instructor.firstName} ${response?.data?.[0].instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${response?.data?.[0].instructor.firstName} ${response?.data?.[0].instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-50">
                {response?.data?.[0].instructor?.additionalDetails?.about}
              </p>
            </div>
            {/* review Slider */}
            <div className='ml-36 text-richblack-25 '>
                <p className='text-4xl font-bold text-center'>Reviews from other Learners</p>
                <ReviewSlider/>
            </div>
            <Footer />
       {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default CourseDetails

