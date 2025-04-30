import React from 'react'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import {Link} from "react-router-dom"
import {FooterLink2} from "../../data/footer-links"

const Resources = [
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces",
  ];
const Company=["About","Careers","Affiliates"];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className=' bg-richblack-800'>
      <div className='flex flex-col w-11/12 max-w-maxContent  mx-auto leading-6 gap-8 py-14 text-richblack-400'>
          {/* top section */}
          <div className='flex flex-row '>
            {/* section1 */}
            <div className='lg:w-[50%] flex flex-row flex-wrap justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3 '> 
              {/* 1st-col */}
              <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
              {/* logo */}
                <img src={Logo} alt='StudyNotion' className="object-contain"/>
                {/* Company section */}
                <div className='flex flex-col gap-2'>
                   <h1 className='text-richblack-50 font-semibold text-[16px]'>Company</h1>
                   {
                    Company.map( (element , index) => {
                      return (
                        <div className='text-[16px] cursor-pointer
                         hover:text-richblack-50 transition-all duration-200' key={index}>
                          <Link to={element.toLowerCase()}>{element}</Link>
                        </div>
                      );
                    })
                   }
                </div>
                {/* Icons */}
                <div className='flex flex-row gap-3 text-lg'>
                    <FaFacebook />
                    <FaGoogle />
                    <FaTwitter />
                    <FaYoutube />
                </div>
              </div> 

              {/* 2nd col */}
              <div className='flex flex-col w-[48%] lg:w-[30%] mb-7 lg:pl-0 space-y-4'>
                <div className='flex flex-col space-y-2'>
                  <h1 className='text-richblack-50 font-semibold text-[16px]'>Resources</h1>
                  {
                    Resources.map( (element , index) => {
                      return(
                        <div className='transition-all duration-200
                         hover:text-richblack-50 cursor-pointer text-[16px]' key={index}>
                          {element}
                        </div>
                      )
                    })
                  }
                </div>
                <div className='flex flex-col space-y-2'>
                  <h1 className='text-richblack-50 font-semibold text-[16px]'>Support</h1>
                  <Link to={"/help-center"} className='transition-all duration-200
                   hover:text-richblack-50 cursor-pointer text-[16px]'>Help Center</Link>
                </div> 
              </div>
                {/* 3rd col */}
              <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0 space-y-4">
                <div className='flex flex-col space-y-2' >
                    <h1 className='text-richblack-50 font-semibold text-[16px]'>Plans</h1>
                    {
                      Plans.map( (element , index) => {
                        return(
                          <div  className='transition-all duration-200
                           hover:text-richblack-50 cursor-pointer text-[16px]' key={index}>
                            {element}
                          </div>
                        )
                      })
                    }

                </div>

                <div className='flex flex-col space-y-2'>
                    <h1 className='text-richblack-50 font-semibold text-[16px]'>Community</h1>
                    {
                      Community.map( (element , index) => {
                        return(
                          <div className='transition-all duration-200
                           hover:text-richblack-50 cursor-pointer text-[16px]' key={index}>
                            {element}
                          </div>
                        )
                      })
                    }
                </div>
              </div>

            </div>
            {/* section2 */}
            <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-10 gap-3">
            {FooterLink2.map((ele, i) => {
              return (
                <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                  <h1 className="text-richblack-50 font-semibold text-[16px]">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                        >
                          <Link to={link.link}>{link.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          </div>

          <div className='h-[1px] w-full bg-richblack-700'> </div>

          <div className='flex flex-row justify-between items-center text-richblack-400 pb-14 text-sm pt-7'> 
            <div className='flex flex-row gap-3'>
               <p className=' border-r-[1px] px-3'>Privacy Policy</p>
               <p className=' border-r-[1px] px-3'>Cookie Policy</p>
               <p>Terms</p>
            </div>

            <div className='text-center'>
               Made With❤️ By Lavina Asudani © 2024 Studynotion
            </div>
            
          </div>
      </div>
    </div>
    )
  }
export default Footer


