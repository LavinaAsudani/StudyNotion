// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useState } from 'react'
// import {RxDropdownMenu} from 'react-icons/rx'
// import { VscAdd, VscEdit } from 'react-icons/vsc';
// import { VscTrash } from 'react-icons/vsc';
// import { VscTriangleDown } from 'react-icons/vsc';
// import SubSectionModal from './SubSectionModal';
// import ConfirmationModal from '../../../../common/ConfirmationModal'
// import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
// import { setCourse } from '../../../../../slices/courseSlice';

// const NestedView = ({handelChangeEditSectionName}) => {
//     const {course} = useSelector((state) => state.course)
//     const {token} = useSelector((state) => state.auth)
//     const dispatch = useDispatch()

//     const [viewSubSection, setViewSubSection] = useState(null);
//     const [addSubSection, setAddSubSection] = useState(null);
//     const [editSubsection, setEditSubSection] = useState(null);

//     const [confirmationModal, setConfirmationModal] = useState(null);


//     const handleDeleteSection = async(sectionId) => {
//       const result = await deleteSection({sectionId, courseId:course._id} , token);

//       if(result){
//         dispatch(setCourse(result))
//       }
//       setConfirmationModal(null)
      
//     }

//     const handleDeleteSubSection = async(subSectionId, sectionId) => {
//       const result = await deleteSubSection({subSectionId,courseId:course._id,sectionId},token);

//       if(result){
//         dispatch(setCourse(result))
        
//       }
//       setConfirmationModal(null)
      
//     }
//   return (
//     <div>
//       <div>
//          {
//           course.courseContent.map((section) => (
//           //only arrow
//           <details key={section.id} open  className='mt-4'>
              
//               <summary  className='flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2'>
//                 <div className='flex items-center gap-x-3'>
//                   <RxDropdownMenu size={25} className=' text-richblack-50'/>
//                   <p className='font-semibold text-richblack-50'>{section.sectionName}</p>
//                 </div>

//                 <div className='flex items-center gap-x-3'>
//                   <button onClick={() => {
//                                                 handelChangeEditSectionName(section._id,section.sectionName);
//                                             }}>
//                     <VscEdit  className='text-lg text-richblack-50 '/>
//                   </button>

//                   <button 
//                     onClick={() => {
//                                      setConfirmationModal(
//                                                   {
//                                                     text1: "Delete this Section?",
//                                                     text2: "All the lectures in this section will be deleted",
//                                                     btn1Text: "Delete",
//                                                     btn2Text: "Cancel",
//                                                     btn1Handler: () => handleDeleteSection(section._id),
//                                                     btn2Handler: () => setConfirmationModal(null)
//                                                   }
//                                                 )
//                     } }>
//                     <VscTrash  className='text-lg text-richblack-50' />
//                   </button>
//                   <span className="font-medium text-richblack-300">|</span>
//                   <VscTriangleDown className='text-lg text-richblack-50' />
//                 </div>
//               </summary>

//                  {/* subsection view */}
//                 <div>
//                    {
//                     section?.subSection?.map((subSection) => (
//                       <div key={subSection?._id} onClick={() => setViewSubSection(subSection)}
//                        className='flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2 ml-4 z-0'> 
//                             <div className='flex items-center gap-x-3'>
//                               <RxDropdownMenu size={25} className=' text-richblack-50'/>
//                               <p className='font-semibold text-richblack-50'>{subSection.title}</p>
//                             </div>

//                             <div onClick={(e) => e.stopPropagation()} 
//                                  className='flex items-center gap-x-3'>
//                                 <button onClick={() => 
//                                                     setEditSubSection({...subSection , sectionId:section._id })
//                                                 }>
//                                   <VscEdit  className='text-lg text-richblack-50 ' />
//                                   </button>

//                                   <button 
//                                     onClick={() => {
//                                                     setConfirmationModal(
//                                                       {
//                                                         text1: "Delete this Sub-Section?",
//                                                         text2: "Selected lecture will be deleted",
//                                                         btn1Text: "Delete",
//                                                         btn2Text: "Cancel",
//                                                         btn1Handler: () => handleDeleteSubSection(subSection._id,section._id),
//                                                         btn2Handler: () => setConfirmationModal(null)
//                                                       }
//                                                     )
//                                   } }> 
//                                     <VscTrash  className='text-lg text-richblack-50' />
//                                   </button>

//                             </div>
//                       </div>
//                     ))
//                    }
//                    {/* add sub section button */}
//                    <div>
//                       <button onClick={() => setAddSubSection(section._id)}
//                       className='mt-3 flex items-center gap-x-1 text-yellow-50 font-bold'>
//                         <VscAdd className='text-lg text-yellow-50 ' />
//                         <p>Add Lecture</p>
//                       </button>
//                    </div>
//                 </div>
//           </details>
//          ))}
//       </div>
//       {
//         addSubSection ? (<SubSectionModal 
//           modalData={addSubSection}
//           setModalData={setAddSubSection}
//           add={true}
//         />)
//         : viewSubSection ? (<SubSectionModal
//           modalData={viewSubSection}
//           setModalData={setViewSubSection}
//           add={true}
//         />) 
//         : editSubsection ? (<SubSectionModal
//           modalData={editSubsection}
//           setModalData={setEditSubSection}
//           add={true}
//         />) 
//         :(<div></div>)
//       }
//       {
//         confirmationModal ? (<ConfirmationModal modalData={confirmationModal}/>) :(<div></div>)
//       }
//     </div>
//   )
// }

// export default NestedView

import { useState } from "react"
import { VscAdd, VscEdit } from 'react-icons/vsc';
import { VscTrash } from 'react-icons/vsc';
import { VscTriangleDown } from 'react-icons/vsc';
import { RxDropdownMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import ConfirmationModal from "../../../../common/ConfirmationModal"
import SubSectionModal from "./SubSectionModal"

export default function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  // States to keep track of mode of modal [add, view, edit]
  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleDeleleSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    })
    if (result) {
      dispatch(setCourse(result))
    }
    setConfirmationModal(null)
  }

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token })
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
  }

  return (
    <>
      <div
        className="rounded-lg bg-richblack-700 p-6 px-8"
        id="nestedViewContainer"
      >
        {course?.courseContent?.map((section) => (
          // Section Dropdown
          <details key={section._id} open className='mt-4'>
            {/* Section Dropdown Content */}
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className=" text-richblack-50">
                  {section.sectionName}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <VscEdit className="text-xl text-richblack-300" />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleleSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <VscTrash className="text-xl text-richblack-300" />
                </button>
                <span className="font-medium text-richblack-300">|</span>
                <VscTriangleDown className={`text-xl text-richblack-300`} />
              </div>
            </summary>
            <div className="px-6 pb-4">
              {/* Render All Sub Sections Within a Section */}
              {section.subSection.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                >
                  <div className="flex items-center gap-x-3 py-2 ">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                      {data.title}
                    </p>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <VscEdit className="text-xl text-richblack-300" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <VscTrash className="text-xl text-richblack-300" />
                    </button>
                  </div>
                </div>
              ))}
              {/* Add New Lecture to Section */}
              <button
                onClick={() => setAddSubsection(section._id)}
                className="mt-3 flex items-center gap-x-1 text-yellow-50 font-bold"
              >
                <VscAdd className="text-lg" />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>
      {/* Modal Display */}
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}
      {/* Confirmation Modal */}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <></>
      )}
    </>
  )
}
