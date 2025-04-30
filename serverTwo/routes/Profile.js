const express=require("express")
const router=express.Router()

const {updateProfile,
       deleteAccount,
       getAllUserDetails,
       getEnrolledCourses,
       updateDisplayPicture,
       instructorDashboard,
    }=require("../controllers/Profile")

const {auth , isStudent , isInstructor , isAdmin}=require("../middlewares/auth")

router.put("/updateProfile" , auth , updateProfile)
router.delete("/deleteProfile",auth, deleteAccount)
router.get("/getAllUserDetails", auth, getAllUserDetails)

router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/instructorDashboard", auth , isInstructor, instructorDashboard)

module.exports = router;