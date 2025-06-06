import React from 'react'
import {Side, sidebarLinks} from "../../../data/dashboard-links"
import {logout} from "../../../services/operations/authAPI"
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal'
import { useState } from 'react'

const Sidebar = () => {
    const {user , loading:profileLoading} = useSelector((state) => state.profile)
    const {loading:authLoading} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [confirmationModal , setConfirmationModal] = useState(null)

    if( authLoading || profileLoading ) {
        // show loading
        return (
          <div className='mt-10'>
            Loading...
          </div>
        )
      }
    

  return (
    <div >
      <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)]
       bg-richblack-800 py-10'>
            <div className='flex flex-col'>
                {
                    sidebarLinks.map((link) => {
                      //check for instructor or user
                        if(link.type && user?.accountType !== link.type) return null;
                        return(
                            <SidebarLink link={link} iconName={link.icon} key={link.id}/>
                        )
                    })
                }
             </div>
             <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700'></div>

             <div className='flex flex-col'>
                <SidebarLink 
                   link={{name:"Settings" , path:"dashboard/settings"}}
                   iconName="VscSettingsGear"
                />
                <button 
                      onClick={ () => setConfirmationModal({
                                            text1 : "Are You Sure ?",
                                            text2 : "You will be logged out of your Account.",
                                            btn1Text : "Logout",
                                            btn2Text : "Cancel",
                                            btn1Handler : () => dispatch(logout(navigate)),
                                            btn2Handler : () => setConfirmationModal(null),
                }) }
                className='px-8 py-2 text-sm font-medium text-richblack-300'
                >  
                <div className='flex items-center gap-x-2'>
                   <VscSignOut className='text-lg'/>
                  <span>Logout</span>
                </div>

                </button>

             </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default Sidebar
