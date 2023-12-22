import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { TbBuildingEstate } from "react-icons/tb"
import { MdLocalLibrary } from "react-icons/md"
import { AiOutlineStock, AiOutlineLogout } from "react-icons/ai"
import { NavLink ,useNavigate } from 'react-router-dom'
import { Button, Drawer } from 'antd';
import {AiOutlineMenu} from "react-icons/ai"
import { ToastContainer,toast } from 'react-toastify'
import { toastFunction } from '../../helpers/utils'
import './Navbar.scss'


const Navbar = () => {
const navigate =useNavigate()
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    function logoutbtn() {
        localStorage.clear();
        toast.success("Logout Successfully Done", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: true,
          });
        setTimeout(() => {
            window.location.href="/login"
          }, 1600);
      }
      
    
    return (
        <>
          <ToastContainer/>
        <div className='main_nav'>
          
            <NavLink to='/' style={{ textDecoration: "none", color: "unset" }}>
                <div className="logo">
                    <img src={logo} alt='Image Error' />
                </div>
            </NavLink>

            <div className="nav_menu">
                <NavLink to='/realestate' activeClassName="active" style={{ textDecoration: "none", color: "unset" }}>
                    <div className="menu">Direct Real Estate</div>
                </NavLink>
                <NavLink activeClassName="active" to='/listedproperty' style={{ textDecoration: "none" }}>
                    <div className="menu"> Listed Property</div>
                </NavLink>
                <NavLink activeClassName="active" to='/economic' style={{ textDecoration: "none" }}>
                    <div className="menu">Economic</div>
                </NavLink>
             
                    <div className="log_btn" onClick={logoutbtn} title='Logout'><AiOutlineLogout />Log Out</div>
              
            </div>
                <div className='close' onClick={showDrawer}>
                   <AiOutlineMenu/>
                </div>

            <Drawer width={300} placement="right" onClose={onClose} open={open}>

                <div className="ham_menu">
                    <NavLink to='/realestate' activeClassName="active" style={{ textDecoration: "none", color: "unset" }}>
                        <div className="menu"><TbBuildingEstate /> Real Estate</div>
                    </NavLink>
                    <NavLink activeClassName="active" to='/listedproperty' style={{ textDecoration: "none" }}>
                        <div className="menu"><MdLocalLibrary /> Listed Property</div>
                    </NavLink>
                    <NavLink activeClassName="active" to='/economic' style={{ textDecoration: "none" }}>
                        <div className="menu"><AiOutlineStock />Economic</div>
                    </NavLink>
                  
                        <div className="log_btn"onClick={logoutbtn} title='Logout'><AiOutlineLogout />Log Out</div>
                 
                </div>

            </Drawer>
        </div>
        </>
    )
}

export default Navbar
