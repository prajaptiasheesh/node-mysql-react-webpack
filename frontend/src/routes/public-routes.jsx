import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../components/login';

const PublicRoutes = ()=>{
    return <>
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<Login />} />
    </>
}

export default PublicRoutes;