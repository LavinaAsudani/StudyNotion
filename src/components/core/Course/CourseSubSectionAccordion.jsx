import React, { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"
import { HiOutlineVideoCamera } from "react-icons/hi"

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div>
      <div className="flex flex-col justify-between py-2">
        <div className={`flex items-center gap-2`}>
          <span>
            <HiOutlineVideoCamera />
          </span>
          <p className="font-semibold">{subSec?.title}</p>
        </div>
        <div className="ml-7 text-richblack-300 mt-2">{subSec.description}</div>
      </div>
    </div>
  )
}

export default CourseSubSectionAccordion
