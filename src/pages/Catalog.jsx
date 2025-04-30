import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector'
import Footer from "../components/common/Footer"
import { categories } from '../services/apis'
import { getCatalogPageData } from '../services/operations/PageAndComponentData'
import CourseSlider from "./../components/core/Catalog/CourseSlider"
import Course_Card from "./../components/core/Catalog/Course_Card"
const Catalog = () => {

    const {catalogName} = useParams()
    const [catalogPageData, setCatalogPageData] = useState(null)
    const [categoryId ,setCategoryId] = useState("")
    const [active, setActive] = useState(1)

   //  Fetch all categories

    useEffect(() => {
     const getCategories = async() => {
        // all categories ka name and description ayga
        const res = await apiConnector("GET",categories.CATEGORIES_API)
        //get category id of the clicked category(jb bhi category name ki value chnge hogi)
        const category_id =
            res?.data?.data?.filter((ct) => ct.name.split(/[\s/]/).join("-").toLowerCase() === catalogName)[0].
        _id;
         console.log("CATEGORY-ID-------------",category_id)
        setCategoryId(category_id)
     }
     getCategories()
    },[catalogName])

   useEffect(() => {
      const getCategoryDetails = async() =>{
         try{
   //          //clicked category ki details lane ke liye backend pr call lgi and data aya
             const res = await getCatalogPageData(categoryId)
             console.log("Priniting category details",res)
             setCatalogPageData(res);
             
        }catch(error){
            console.log(error)
         }
        }
       if(categoryId){
         getCategoryDetails()
       }
     },[categoryId])


  
  return (
    <div  className=" box-content  bg-richblack-900 ">

      <div className='bg-richblack-800 px-4'>
            <div className="mx-auto flex min-h-[260px]  max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
               <p className="text-sm text-richblack-300">{`Home / catalog / `}
               <span className="text-yellow-25">{catalogPageData?.selectedCategory?.name}</span></p>
               <p className="text-3xl text-richblack-5">{catalogPageData?.selectedCategory?.name}</p>
               <p  className="max-w-[870px] text-richblack-200">{catalogPageData?.selectedCategory?.description}</p>
            </div>
      </div>

       <div >
           {/* section-1 */}
           <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
             <div className='font-bold text-richblack-25 text-2xl'>Courses to get you Started</div>
              <div className='flex gap-x-3'>
                <p className={`px-4 py-2  cursor-pointer ${active === 1 ? "border-b border-b-yellow-25 text-yellow-25"
                 : "text-richblack-50"}`} onClick={() => setActive(1)}>
                    Most Popular
                </p>
                <p className={`px-4 py-2 cursor-pointer ${active === 2 ? "border-b border-b-yellow-25 text-yellow-25" : 
                "text-richblack-50" }`} onClick={() => setActive(2)}>
                    New
                </p>
              </div>
              <div className='py-8'>
               <CourseSlider
                  Courses={catalogPageData?.selectedCategory?.courses}
              />
            </div>
           </div>

           {/* section-2 */}
           <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
           <div className='font-bold text-richblack-25 text-2xl'>Top Courses on StudyNotion</div>
                <div  className='py-8'>
                    <CourseSlider  Courses={catalogPageData?.differentCourses}/>
                </div>
            </div>

            {/* section-3 */}
            <div  className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent" >
                <div className='font-bold text-richblack-25 text-2xl'>Frequently Bought</div>
                <div className='py-8'>
                   <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                      {
                        catalogPageData?.mostSellingCourses?.slice(0,4).map((course , index)=> (
                           <Course_Card key={index} course={course} Height={"h-[400px]"}/>
                        ))
                      }
                   </div>
                </div>
            </div>

       </div>
       <Footer/>
    </div>
  )
}

export default Catalog
