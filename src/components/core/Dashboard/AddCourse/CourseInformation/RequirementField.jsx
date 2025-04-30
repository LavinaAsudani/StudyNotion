import React, { useEffect, useState } from 'react'

const RequirementField = ({name, label, register, errors, setValue, getValues}) => {
     
    //single single values of requirement
    const [requirement , setRequirement] = useState("")
    // the array of all requirements
    const [requirementList , setRequirementList] = useState([])

    useEffect(()=> {
        register(name,{
            required:true,
            validate:(value) => value.length > 0
        })
    },[])

    //jb jb list update hogi set value hogi
    useEffect(() => {
        setValue(name , requirementList)
    } ,[requirementList])

    const handleAddRequirement = () =>{
     if(requirement){
        //imp:spread operator braces
        setRequirementList([...requirementList ,requirement])
        setRequirement("")
     }
    }

    const handleRemoveRequirement = ({index}) =>{
        //clone kr diya requirements into updatedReqList
        const updatedRequirementList = [...requirementList];
        //updated me se clicked index pr jake 1 ele remove kr do
        updatedRequirementList.splice(index, 1);
        //requirementList set krdo to updatedReqList
        setRequirementList(updatedRequirementList);
    }
  return (
    <div>
      <label className='text-sm text-richblack-5' htmlFor={name}>{label}<sup className='text-pink-200'>*</sup></label>
      <div>
         <input
            type='text'
            id={name}
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            className='w-full text-richblack-5 bg-richblack-700 p-3 rounded-lg'
         />
         <button type='button'
                 onClick={handleAddRequirement}
                 className='font-semibold text-yellow-50 mt-3'
          >
              Add
         </button>
      </div>
      {
       requirementList.length > 0 && (
        <ul className='mt-2 list-inside list-disc'>
            {
                requirementList.map((requirement , index) => (
                   <li key={index} className='flex items-center text-richblack-5'>
                        <span>{requirement}</span>
                        <button 
                               type='button'
                               onClick={() => handleRemoveRequirement(index)}
                               className='ml-2 text-xs text-pure-greys-300 '>
                            clear
                        </button>
                    </li>
                ))
            }
        </ul>
       )
      }

     
      {
        errors[name] && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
                {label} is required
            </span>
        )
      }
    </div>
  )
}

export default RequirementField
