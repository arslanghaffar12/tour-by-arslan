// Footer.js

import React from 'react';
import { FaEnvelope, FaLinkedin, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ background: '', color: 'white', padding: '20px', textAlign: 'center' , zIndex : '100', position : ""}}>
      <div>
        <h2>Contact Us</h2>
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <span style={{ marginBottom: '5px' }}>
            <FaEnvelope style={{ marginRight: '5px' }} />
            arslanghaffar21@gmail.com
          </span>
          <span>
            <FaPhone style={{ marginRight: '5px' }} />
            0320-4170775
          </span>
          <span className='d-flex'>
            <FaLinkedin className='mt-1' style={{ marginRight: '5px' }} />
            <a style={{textDecoration : "none", color : "white"}} href='https://linkedin.com/in/arslan-ghaffar'>Arslan Ghaffar</a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
