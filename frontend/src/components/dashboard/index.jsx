import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../shared/sidebar';

const menuList = [
    {
        title: 'Home',
        url: '/'
    },
    {
        title: 'My Profile',
        url: '/profile/me'
    },
    {
        title: 'Users',
        url: '/users'
    },
    {
        title: 'Categories',
        url: '/category'
    }
]

const Dashboard = ()=>{
    return <div>
        <Sidebar menuList={menuList} className='sidebar'>
            <Outlet />
        </Sidebar>
    </div>
}

export default Dashboard;