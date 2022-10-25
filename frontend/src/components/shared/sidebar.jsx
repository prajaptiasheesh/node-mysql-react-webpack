import React, { useCallback, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ menuList = [], className = "sidebar", children })=>{
    const [isSidebarOpen, toggleSidebar] = useState(true);
    const sidebarRef    = useRef(null);
    const bodyRef = useRef(null);

    const handleToggle = useCallback(()=>{
        if(!isSidebarOpen){
            sidebarRef.current.style.width = "250px"
            bodyRef.current.style.marginLeft = "250px"
        }else{
            bodyRef.current.style.marginLeft = "0"
            sidebarRef.current.style.width = "0"
        }
        console.log(sidebarRef.current)
        toggleSidebar((prev)=>!prev);
    }, [isSidebarOpen])

    const renderList = ( list, keyPrefix )=>{
        return <ul>
            {list.map((item, idx)=>{
            
                if(item.children && Array.isArray(item.children, idx)){
                    return renderList(item.children, idx)
                }else{
                    return <li key={`${idx}_${keyPrefix}`}>
                        <NavLink to={item.url}>{item.title}</NavLink>
                    </li>
                }
            })}
        </ul> 
    }

    const Toggler = ({className})=>{
        return <button type='button' className={`btn ${className && className}`} onClick={handleToggle} > {isSidebarOpen ? 'Close' : 'Open'} </button>
    }
    return <div className='sidebar-container'>
            {!isSidebarOpen && <div className="toggle-container">
                    <Toggler className="openbtn" />
                </div>}
            <div id="main" className={className} ref={sidebarRef}>
                <div>
                    { isSidebarOpen && <Toggler className={'closebtn'} />}
                </div>
                <div className='list'>
                    {renderList(menuList, 'menu')}
                </div>
            </div>
            { children && <div className='body' ref={bodyRef}>
                {children}
            </div>}
        </div>
}

export default Sidebar;