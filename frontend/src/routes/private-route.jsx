import React from 'react';
import { Navigate } from 'react-router-dom';
import { isUserLoggedIn } from "../utils"; 

const PrivateRoute = ({ children })=>{
    
    if(isUserLoggedIn()){
        return children
    }else{
        return <Navigate to="/login" replace={true} />
    }
}

export default PrivateRoute;