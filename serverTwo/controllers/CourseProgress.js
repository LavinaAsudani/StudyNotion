const CourseProgress = require("../models/CourseProgress")
const SubSection = require("../models/SubSection")

exports.updateCourseProgress = async(req , res) => {
    const { courseId, subSectionId } = req.body
    const userId = req.user.id
    try{
        console.log("SubSection-id", subSectionId)
        console.log("Courseid" ,courseId)
       const subSection = await SubSection.findById(subSectionId)
       if(!subSection){
        return res.status(404)
        .json({ error: "Invalid subSection" })
       }
       let courseProgress = await CourseProgress.findOne(
        {courseID:courseId , userId:userId}
    );
    console.log("course progresssss" , courseProgress)
    if(!courseProgress){
        return res.status(404).json({
            success:false,
            message:"Course Progress Does not exist"
        })
    }else{
        //check for  re-completing video
        if(courseProgress.completedVideos.includes(subSectionId)){
            return res.status(400).json({
               error:"Subsection already completed"
            });
        }
        //if not completed push
        courseProgress.completedVideos.push(subSectionId)
    }
    await courseProgress.save();
       return res.status(200).json({
        success:true,
        message:"Lecture Completed",
       })
    }catch(error){
        console.error(error)
        return res.status(400).json({
            error:"Internal Server Error"
        })
    }
}