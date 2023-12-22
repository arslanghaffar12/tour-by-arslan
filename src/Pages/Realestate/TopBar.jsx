// components/TopBar.js

import React from 'react';
import Sidebar from './Menu';
import logo from "../../assets/sevenb.jpg"
import arslan from "../../assets/arslan.jpeg"

import { FaEnvelope, FaPhone } from 'react-icons/fa';

const TopBar = () => {
    return (


        <div className="top-bar">
            <img src={logo} style={{ width: "50px", height: "", objectFit: "contain" }} />

            <div style={{ marginLeft: "auto", color: "white", fontWeight: "bold", zIndex: '100' }}>
                <span>
                    0320-4170775
                    <img src={arslan } style={{width : "50px", height : "30px", borderRadius : "50%", objectFit : "contain"}} />

                </span> 
            </div>
        </div>

    );
};

export default TopBar;
