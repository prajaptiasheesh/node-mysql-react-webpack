import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ListCategory from '../components/category/list-category';
import Dashboard from '../components/dashboard';
import Home from '../components/home';
import Login from '../components/login';
import Profile from '../components/profile';
import Users from '../components/users';
import CreateNewUser from '../components/users/create-new-user';
import PrivateRoute from './private-route';

const CustomRoutes = ()=>{
    return <Routes>
            <Route path="/" element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>} 
            >
                <Route index element={<Home />}></Route>
                <Route path='profile/me' element={<Profile />}></Route>
                <Route path='users' element={<Users />} />
                <Route path='users/new' element={<CreateNewUser />} />
                <Route path='category' element={<ListCategory />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<Login />} />
        </Routes>
}

export default CustomRoutes;