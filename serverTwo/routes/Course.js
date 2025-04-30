const express=require("express")
const router=express.Router()

//Import Course Controllers
const {createCourse, 
       getAllCourses,
       getCourseDetails,
       getFullCourseDetails,
       deleteCourse,
       editCourse,
       getInstructorCourses
      }=require("../controllers/Course");


//Import Category Controllers
const {createCategory,
       showAllCategories,
       categoryPageDetails 
     }=require("../controllers/Category");


//Import Section Controllers
const {createSection,
       updateSection,
       deleteSection
      }=require("../controllers/Section");


//Import SubSection Controllers
const {createSubSection,
       updateSubSection,
       deleteSubSection
      }=require("../controllers/Subsection");



//Import RatingAndReview Controllers
const {createRating,
       getAverageRating,
       getAllRatingAndReviews
      }=require("../controllers/RatingAndReview");

const {updateCourseProgress} = require("../controllers/CourseProgress")

//Import middlewares
const{auth,isStudent ,isInstructor,isAdmin}=require("../middlewares/auth")


//Course Routes(authentication applied as only instructors can use )
//create course
router.post("/createCourse" , auth , isInstructor, createCourse)
//create Section
router.post("/addSection", auth , isInstructor , createSection)
//create Subsection
router.post("/addSubSection", auth , isInstructor , createSubSection)
//update Section
router.post("/updateSection", auth , isInstructor , updateSection)
//update Subsection
router.post("/updateSubSection", auth , isInstructor , updateSubSection)
//delete section
router.delete("/deleteSection", auth , isInstructor , deleteSection)
//delete subsection
router.delete("/deleteSubSection", auth , isInstructor , deleteSubSection)
//delete course
router.delete("/deleteCourse", auth , isInstructor , deleteCourse)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
//get full course details
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
//edit course
router.post("/editCourse", auth , isInstructor , editCourse)
//get instructor courses
router.get("/getInstructorCourses", auth , isInstructor , getInstructorCourses)


//Category Routes(by admin only)
router.post("/createCategory" , auth , isAdmin , createCategory)
router.get("/showAllCategories" , showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)


//Rating and review
router.post("/createRating", auth , isStudent , createRating)
router.get("/getAverageRating" , getAverageRating)
router.get("/getReviews" , getAllRatingAndReviews)

//course progress
router.post("/updateCourseProgress",auth , isStudent , updateCourseProgress)

module.exports = router







      