import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import copy from 'copy-to-clipboard';
import {toast} from 'react-hot-toast';
import {ACCOUNT_TYPE} from "../../../utils/constants"
import { addToCart } from '../../../slices/cartSlice';

function CourseDetailsCard({course , setConfirmationModal , handleBuyCourse}){
    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        thumbnail : thumbnailImage,
        price:CurrentPrice,
    } = course;

    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are a Instructor.You can't buy a Course")
            return;
        }
        if(token){
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1:"You Are not Logged In",
            text2:"Please Login to Add to Cart",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:() => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null)
        })
    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied to Clipboard");
    }
      return (
         <div className="flex flex-col gap-4 rounded-md bg-richblack-700 p-4 border
          border-richblack-500 text-richblack-5 max-w-[400px] max-h-min">
            <div className="w-full max-h-[300px] overflow-hidden rounded-2xl">
            <img src={thumbnailImage}
                 alt="Thumbnail Image"
                className=" min-h-[150px]"
            />
            </div>
            <div className="space-x-2 pb-4 text-3xl font-semibold">Rs.{CurrentPrice}</div>
            <div className="flex flex-col gap-4">
                <button  onClick={
                         user && course?.studentsEnrolled.includes(user?._id)
                        ? () => navigate("/dashboard/enrolled-courses")
                        : handleBuyCourse
                       }  className="bg-yellow-50 text-black w-full p-4 font-semibold rounded-lg text-center"
                       >
                       {
                         user && course?.studentsEnrolled.includes(user?._id)
                         ? "Go To Course"
                         : "Buy Now"
                       }
                </button>
               {
                (!course?.studentsEnrolled.includes(user?._id)) && (
                    <button onClick={handleAddToCart} className="bg-richblack-800 text-richblack-5 w-full p-4 font-semibold 
                    rounded-lg text-center">
                        Add to Cart
                    </button>
                )
               } 
               
            </div>
               <div>
                 <p className="pb-3 pt-6 text-center text-sm text-richblack-50"> 30-Day Money-Back Guarantee</p>
                 <p className={`my-2 text-xl font-semibold `}>This course includes:</p>
                 <div className='flex flex-col gap-3 text-sm text-caribbeangreen-100'>
                   {
                    course?.instructions?.map((item , index) => (
                        <p key={index} className={`flex gap-2 items-center w-[70%]`}>
                        <BsFillCaretRightFill/>
                          <span>{item}</span>
                        </p>
                    ))
                   }
                 </div>
                    <div className="text-center">
                        <button
                        className=" mx-auto flex items-center  gap-2 py-6 text-yellow-100 "
                        onClick={handleShare}
                        >
                        <FaShareSquare size={15} /> Share
                        </button>
                   </div>
               </div>
         </div>
      );
}
export default CourseDetailsCard