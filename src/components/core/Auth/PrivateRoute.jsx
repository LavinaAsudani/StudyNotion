import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    const {token} = useSelector((state) => state.auth)

    //user is logged in
    if(token !== null) {
        return children
    }else {
        return <Navigate to="/login"/>
    }
 
}

export default PrivateRoute
