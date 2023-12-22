import React, { useState } from "react";
import './menu.css';
import { CiMenuFries, } from 'react-icons/ci';
import { MdClose, MdMenu } from 'react-icons/md';
import { Link } from "react-router-dom";


const ToggleSidebar = () => {
    const [isOpen, setIsopen] = useState(false);

    const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }
    return (
        <>
            <div className=" mt-3" style={{ position: "absolute", zIndex: "100" }}>

                <nav className="navbar navbar-expand-lg  dark shadow-md">
                    <div className=" p-2">
                        {/* <div className="form-inline ml-auto"> */}
                        <div className="" onClick={ToggleSidebar} style={{ backgroundColor: "#212529", cursor : "pointer" }}  >
                            <MdMenu  className='m-2' style={{ marginRight: '', color: "white" }} />
                        </div>
                        {/* </div> */}
                    </div>
                </nav>
                <div className={`sidebar ${isOpen == true ? 'active' : ''}`}>
                    <div className="sd-header">
                        <h4 className="mb-0">Sidebar Header</h4>
                        <div className="" style={{ backgroundColor: "#212529", cursor : "pointer" }} onClick={ToggleSidebar} >
                            <MdClose className='m-2'style={{color: "white"}}/></div>
                    </div>
                    <div className="sd-body">
                        <ul>
                            <li><Link to={'/'} className="sd-link">Home</Link></li>
                            <li><Link to={'/schedule'} className="sd-link">Tour Schedule</Link></li>
                            {/* <li><Link to={'/food-menu'} className="sd-link">Food Menu</Link></li> */}
                            <li><Link to={'/memories'} className="sd-link">Kalam Memories</Link></li>
                        
                        </ul>
                    </div>
                </div>
                <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
            </div>

        </>
    )
}

export default ToggleSidebar


