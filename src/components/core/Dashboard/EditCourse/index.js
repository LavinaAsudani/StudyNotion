import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import {
  getFullDetailsOfCourse,
} from "../../../../services/operations/courseDetailsAPI"
import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import RenderSteps from "../AddCourse/RenderSteps"

const EditCourse = () => {

    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth);
    const {course} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const populateCourseDetails = async() => {
            setLoading(true)
            console.log("Course ID", courseId)
            const result = await getFullDetailsOfCourse(courseId, token)
            console.log("result=-----",result)
            if(result?.courseDetails){
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails))
            }

            console.log("course-=====" , course)
            setLoading(false)
        }
        populateCourseDetails();
    },[])

    if (loading) {
        return (
          <div className="grid flex-1 place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
  return (
    <div> 
        <h1 className="text-3xl font-medium text-richblack-5">Edit Course</h1>
        <div className="mx-auto max-w-[600px]">
        {course ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Course not found
          </p>
        )}
      </div>
      
    </div>
  )
}

export default EditCourse
