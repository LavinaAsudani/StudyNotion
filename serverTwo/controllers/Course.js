const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress")
const { convertSecondsToDuration } = require("../utils/secToDuration")
require("dotenv").config()
// Function to create a new course


exports.createCourse = async (req, res) => {
	try {
		// Get user ID from request object
		
		const userId = req.user.id;
		

		// Get all required fields from request body
		let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			status,
			instructions,
		} = req.body;
		
        
		console.log(req.files)
		// Get thumbnail image from request files
		const thumbnail = req.files.thumbnailImage;

			// Check if any of the required fields are missing
		if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag ||
			!thumbnail ||
			!category
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
		console.log("11111111111111111111111111111111111")
		if (!status || status === undefined) {
			status = "Draft";
		}
		// Check if the user is an instructor
		const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});
		console.log("2222222222222222222222222")

		if (!instructorDetails) {
			return res.status(404).json({
				success: false,
				message: "Instructor Details Not Found",
			});
		}
		console.log("instruction", instructorDetails)
        
		// Check if the tag given is valid
		const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}
	  console.log("Category details" , categoryDetails)

		//Upload the Thumbnail to Cloudinary
		const thumbnailImage = await uploadImageToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);
		console.log(thumbnailImage);
		
		// Create a new course with the given details
		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag: tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
		});
		
        console.log("new Course",newCourse)
		// Add the new course to the User Schema of the Instructor
		await User.findByIdAndUpdate(
			{
				_id: instructorDetails._id,
			},
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
		console.log("33333333333333333333333333333")
		// Add the new course to the Categories
		const categoryDetails2 = await Category.findByIdAndUpdate(
			{ _id: category },
			{
			  $push: {
				courses: newCourse._id,
			  },
			},
			{ new: true }
		  )
		console.log("444444444444444444444444444444")
		// Return the new course and a success message
		res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});
	} catch (error) {
		// Handle any errors that occur during the creation of the course
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});
	}
};


exports.editCourse = async (req, res) => {
	try {
	  const { courseId } = req.body
	  const updates = req.body
	  const course = await Course.findById(courseId)
  
	  if (!course) {
		return res.status(404).json({ error: "Course not found" })
	  }
  
	  // If Thumbnail Image is found, update it
	  if (req.files) {
		console.log("thumbnail update")
		const thumbnail = req.files.thumbnailImage
		const thumbnailImage = await uploadImageToCloudinary(
		  thumbnail,
		  process.env.FOLDER_NAME
		)
		course.thumbnail = thumbnailImage.secure_url
	  }
  
	  // Update only the fields that are present in the request body
	  for (const key in updates) {
		if (updates.hasOwnProperty(key)) {
		  if (key === "tag" || key === "instructions") {
			course[key] = JSON.parse(updates[key])
		  } else {
			course[key] = updates[key]
		  }
		}
	  }
  
	  await course.save()
  
	  const updatedCourse = await Course.findOne({
		_id: courseId,
	  })
		.populate({
		  path: "instructor",
		  populate: {
			path: "additionalDetails",
		  },
		})
		.populate("category")
		.populate("ratingAndReviews")
		.populate({
		  path: "courseContent",
		  populate: {
			path: "subSection",
		  },
		})
		.exec()
  
	  res.json({
		success: true,
		message: "Course updated successfully",
		data: updatedCourse,
	  })
	} catch (error) {
	  console.error(error)
	  res.status(500).json({
		success: false,
		message: "Internal server error",
		error: error.message,
	  })
	}
  }
  // Get Course List
  exports.getAllCourses = async (req, res) => {
	try {
	  const allCourses = await Course.find(
		{ status: "Published" },
		{
		  courseName: true,
		  price: true,
		  thumbnail: true,
		  instructor: true,
		  ratingAndReviews: true,
		  studentsEnrolled: true,
		}
	  )
		.populate("instructor")
		.exec()
  
	  return res.status(200).json({
		success: true,
		data: allCourses,
	  })
	} catch (error) {
	  console.log(error)
	  return res.status(404).json({
		success: false,
		message: `Can't Fetch Course Data`,
		error: error.message,
	  })
	}
  }

//getCourseDetails

exports.getCourseDetails=async(req,res)=>{
	try{
		//fetch course Id
		const {courseId}=req.body

		

        //db call
		const courseDetails=await Course.find({_id:courseId})
		                                      .populate(
												{
													path:"instructor",
													populate:{
														path:"additionalDetails"
													},
												}
											)
											.populate("category")
											// .populate("ratingAndreviews")
											.populate({
												 path:"courseContent",
												 populate:{
													path:"subSection",
												 }
											 })
											 .exec();
	  if(!courseDetails){
		 return res.status(400).json({
			success: false,
			message: `Could not find the Course with course id : ${courseId}`,
		  });
		}
        console.log("Course Details:" ,courseDetails)

		return res.status(200).json({
			success: true,
			message: "Course Details fetched Successfully",
			data:courseDetails,
		});
 
	}catch(error){
		console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Course Data`,
			error: error.message,
		});
	}
}
//delete Course

exports.deleteCourse = async(req, res) =>{
	try{
		//fetch course Id
		const {courseId}=req.body

        if(!courseId){
			return res.status(400).json({
				success: false,
				message: "Course Id is required",
			}
		)};
		//delete course from category
		const categoryDetails=await Category.findByIdAndUpdate(courseId,{
			$pull:{
				course:courseId,
			}
		})
		//delete course from user
		const userDetails=await User.findByIdAndUpdate(courseId,{
			$pull:{
				courses:courseId,
			}
		})

       //delete course
		await Course.findByIdAndDelete(courseId);
		
		return res.status(200).json({
			success: true,
			message: "Course Deleted Successfully",
		});

	}catch(error){
		console.log(error);
		return res.status(500).json({
			success:false,
			message:"Internal Server Error",
			error:error.message,
		})
	}
}

// Function to get all courses of a particular instructor
exports.getInstructorCourses = async (req, res) => {
	try {
		// Get user ID from request object
		const userId = req.user.id;

		// Find all courses of the instructor
		const allCourses = await Course.find({ instructor: userId });

		// Return all courses of the instructor
		res.status(200).json({
			success: true,
			data: allCourses,
		});
	} catch (error) {
		// Handle any errors that occur during the fetching of the courses
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch courses",
			error: error.message,
		});
	}
}

exports.getFullCourseDetails = async (req, res) => {
	try {
	  const { courseId } = req.body
	  const userId = req.user.id
	  const courseDetails = await Course.findOne({
		_id: courseId,
	  })
		.populate({
		  path: "instructor",
		  populate: {
			path: "additionalDetails",
		  },
		})
		.populate("category")
		.populate("ratingAndReviews")
		.populate({
		  path: "courseContent",
		  populate: {
			path: "subSection",
		  },
		})
		.exec()
  
	  let courseProgressCount = await CourseProgress.findOne({
		courseID: courseId,
		userId: userId,
	  })
  
	  console.log("courseProgressCount : ", courseProgressCount)
  
	  if (!courseDetails) {
		return res.status(400).json({
		  success: false,
		  message: `Could not find course with id: ${courseId}`,
		})
	  }
  
	  // if (courseDetails.status === "Draft") {
	  //   return res.status(403).json({
	  //     success: false,
	  //     message: `Accessing a draft course is forbidden`,
	  //   });
	  // }
  
	  let totalDurationInSeconds = 0
	  courseDetails.courseContent.forEach((content) => {
		content.subSection.forEach((subSection) => {
		  const timeDurationInSeconds = parseInt(subSection.timeDuration)
		  totalDurationInSeconds += timeDurationInSeconds
		})
	  })
  
	  const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
	  return res.status(200).json({
		success: true,
		data: {
		  courseDetails,
		  totalDuration,
		  completedVideos: courseProgressCount?.completedVideos
			? courseProgressCount?.completedVideos
			: [],
		},
	  })
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}
  }
