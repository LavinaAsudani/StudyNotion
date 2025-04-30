import React from 'react'
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  return (
    <div className={`h-[300px] w-[360px] lg:w-[30%] flex flex-col ${currentCard === cardData?.heading ?
     "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
    :"bg-richblack-800" } text-richblack-25 h-[300px] box-border cursor-pointer `}
     onClick={() => setCurrentCard(cardData?.heading)}>

     <div className='h-[80%] p-6 border-b-[2px] border-richblack-400 border-dashed flex flex-col gap-3'>

            <div className={`${currentCard === cardData?.heading ? "text-richblack-800"
            :"text-richblack-25"} font-semibold text-[20px]`}>{cardData?.heading}</div>


            <div className="text-richblack-400 ">{cardData.description }</div>
     </div>

       
        <div className={`flex flex-row justify-between items-center  ${currentCard === cardData?.heading ? "text-blue-300"
        :"text-richblack-300"} px-6 py-3 font-medium`}>

            <div className='flex flex-row gap-2 items-center text-lg'>
            <HiUsers />
            <p>{cardData?.level}</p>
            </div>

            <div className='flex flex-row gap-2 items-center text-lg'>
            <ImTree />
            <p>{cardData?.lessionNumber} Lessons</p>
            </div>
            
        </div>
    </div>
  )
}

export default CourseCard
