import React from 'react';
import { useNavigate } from 'react-router-dom';

const Users = ()=>{
    let navigate = useNavigate();

    return <div className='container'>
        <div className='row'>
            <div className='col'>Users</div>
            <div className='col text-end' >
                <button type='button' onClick={()=>navigate('/users/new', { replace: false })}>create a new user</button>
            </div>
        </div>
    </div>
}

export default Users;