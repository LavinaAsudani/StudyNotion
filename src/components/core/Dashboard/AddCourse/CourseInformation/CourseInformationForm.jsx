import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {addCourseDetails, editCourseDetails, fetchCourseCategories} from "../../../../../services/operations/courseDetailsAPI"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { setStep, setCourse, setEditCourse} from '../../../../../slices/courseSlice';
import ChipInput from './ChipInput'
import Upload from './Upload'
import RequirementField from './RequirementField'
import IconBtn from "../../../../common/IconBtn"
import toast from 'react-hot-toast'
import { COURSE_STATUS } from "../../../../../utils/constants"

const CourseInformationForm = () => {
   
   // already made functions are imported
    const {
        register,
        handleSubmit, 
        setValue, 
        getValues, 
        formState: { errors },
    } = useForm()

    const dispatch = useDispatch()
    const {token} = useSelector((state)=> state.auth)
    const {course , editCourse} = useSelector((state)=> state.course)
    const [loading , setLoading] = useState(false)
    const [courseCategories , setCourseCategories] = useState([])
    
    useEffect(() => {
        const getCategories = async() => {
            setLoading(true)
            const categories = await fetchCourseCategories()
            if(categories.length > 0){
                setCourseCategories(categories)
            }
            setLoading(false)
        }
         if(editCourse){
            setValue("courseTitle" , course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
         }

        getCategories();
    },[])

    const isFormUpdated = () =>{
      const currentValues = getValues();
      if(currentValues.courseTitle !== course.courseName ||
        currentValues.courseShortDesc !== course.courseDescription ||
        currentValues.coursePrice !== course.price  ||
        currentValues.courseTags.toString() !== course.tag.toString() ||
        currentValues.courseBenefits !== course.whatYouWillLearn ||
        currentValues.courseCategory._id !== course.category._id ||
        currentValues.courseImage !== course.thumbnail ||
        currentValues.courseRequirements.toString() !== course.instructions.toString()){
        return true;
      }else{
        return false;
      }
    }
   //handles next button click
    const onSubmit = async(data) => {
         if(editCourse){
           if(isFormUpdated())
            {
            const currentValues = getValues()
            const formData = new FormData()

            formData.append("courseId", course._id);
            if(currentValues.courseTitle !== course.courseName) {
                formData.append("courseName", data.courseTitle);
            }

            if(currentValues.courseShortDesc !== course.courseDescription) {
                formData.append("courseDescription", data.courseShortDesc);
            }

            if(currentValues.coursePrice !== course.price) {
                formData.append("price", data.coursePrice);
            }
            if (currentValues.courseTags.toString() !== course.tag.toString()) {
                formData.append("tag", JSON.stringify(data.courseTags))
              }

            if(currentValues.courseBenefits !== course.whatYouWillLearn) {
                formData.append("whatYouWillLearn", data.courseBenefits);
            }

            if(currentValues.courseCategory._id !== course.category._id) {
                formData.append("category", data.courseCategory);
            }

            if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                formData.append("instructions", JSON.stringify(data.courseRequirements));
            }
            if (currentValues.courseImage !== course.thumbnail) {
                formData.append("thumbnailImage", data.courseImage)
              }
            setLoading(true)
            const result = await editCourseDetails(formData , token)
            setLoading(false)

            if(result){
              
              dispatch(setEditCourse(false));
              dispatch(setStep(2));
              dispatch(setCourse(result));
            }
           }else{
            toast.error("No Changes Made to the Form")
        }
        return;
         }

         //create new course
         const formData = new FormData()
         formData.append("courseName", data.courseTitle);
         formData.append("courseDescription", data.courseShortDesc);
         formData.append("price", data.coursePrice);
         formData.append("whatYouWillLearn", data.courseBenefits);
         formData.append("category", data.courseCategory);
         formData.append("instructions", JSON.stringify(data.courseRequirements));
         formData.append("status", COURSE_STATUS.DRAFT);
         formData.append("tag", JSON.stringify(data.courseTags));
         formData.append("thumbnailImage", data.courseImage);

         setLoading(true)
         const result = await addCourseDetails(formData , token)

         if(result){
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }
        setLoading(false)
         console.log("Printing FormData" , formData)
    }

  return (
    
    <div>
      <form
       onSubmit={handleSubmit(onSubmit)}
       className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'
       >
       
       {/* course title */}
       <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="courseTitle">
                Course Title
                <sup className="text-pink-200">*</sup>
            </label>
            <input
            id='courseTitle'
            placeholder='Enter Course Title'
            {...register("courseTitle" , {required:true})}
            className='w-full text-richblack-5 bg-richblack-700 p-3 rounded-lg'
             />
           {
            errors.courseTitle && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">Course Title is Required</span>
            )
           }
       </div>
        
        {/* course Description */}
       <div>
           <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
                Course Short Description
                <sup className="text-pink-200">*</sup>
            </label>

              <textarea
                   id='courseShortDesc'
                   placeholder='Enter Description'
                   {...register("courseShortDesc" , {required:true})}
                   className='min-h-[130px] w-full text-richblack-5 bg-richblack-700 p-3 rounded-lg'
                   >

                {
                   errors.courseShortDesc && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Course Description is Required</span>
                  )
                }

            </textarea>
       </div>

        {/* course Price*/}
        <div className="flex flex-col space-y-2 relative">
            <label className="text-sm text-richblack-5" htmlFor="coursePrice">
                 Price
                <sup className="text-pink-200">*</sup>
            </label>
            <input
            id='coursePrice'
            placeholder='Enter Price'
            {...register("coursePrice" , 
                              {required:true , valueAsNumber:true})}
            className='w-full text-richblack-5 bg-richblack-700 p-3 rounded-lg !pl-12'
             />
             <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-2 
             text-2xl text-richblack-400" />

           {
            errors.coursePrice && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">Course Price is Required</span>
            )
           }
       </div>

       {/* course Category */}
       <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="courseCategory">
                 Category
                <sup className="text-pink-200">*</sup>
            </label>
            <select
                id='courseCategory'
                {...register("courseCategory", {required:true})}
                defaultValue=""
                className='w-full text-richblack-5 bg-richblack-700 p-3 rounded-lg '
                  > 
                 <option value="" disabled>Choose a Category</option>
                 {
                    !loading && courseCategories.map((category, index) => (
                        <option key={index} value={category?._id}>
                            {category?.name}
                        </option>
                    ))
                 }

            </select>
            {
            errors.courseCategory && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">Course Category is Required</span>
            )
           }
       </div>
       {/* tags feild */}
       
       <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        />
        <Upload
            name={"courseImage"}
            label={"CourseImage"}
            register={register}
            errors={errors}
            setValue={setValue}
        />

        {/* benefits of course */}
        <div className="flex flex-col space-y-2">
            <label  className="text-sm text-richblack-5 " htmlFor="coursebenefits">
              Benefits of the Course
               <sup className="text-pink-200">*</sup>
            </label>
            <textarea
                 id='courseBenefits'
                 placeholder='Enter Benefits of the Course'
                 {...register("courseBenefits" , {required:true})}
                 className='min-h-[130px] w-full text-richblack-5 bg-richblack-700 p-3 rounded-lg'
            >

            </textarea>
        </div>

        <RequirementField
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />

        {/* submit buttons */}
        <div className='flex justify-end gap-x-2'>
            {
                editCourse && (
                    <button
                    onClick={() => dispatch(setStep(2))}
                    className=' text-[10px] md:text-sm p-2 px-1 font-semibold 
                    rounded-md flex items-center gap-x-2 bg-richblack-300'
                    >
                        Continue Without Saving
                    </button>
                )
            }

            <IconBtn type={"submit"}
                text={!editCourse ? "Next" : "Save Changes"}
                />
        </div>
      </form>
    </div>
  )
}

export default CourseInformationForm
