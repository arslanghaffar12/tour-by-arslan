// components/MainPage.js

import React, { Fragment } from 'react';
import TopBar from './TopBar';
import Menu from './Menu';
import black from '../../assets/black.jpg'
import Footer from './Footer';
import Sidebar from './Menu';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (


        <Fragment>
            <Sidebar />



            <div className="" style={{ backgroundColor: "", height: "100%", width: "100%" }}>
                <div className='background-image'>
                    <div className=' pt-3' style={{ justifyContent: "center", alignItems: "center" , textAlign : "center", flex : "column"}}>
                        <h4 style={{color : "white"}}>Tour to kashmir by sevenB</h4>
                        <Button><Link to={'/schedule'} style={{textDecoration : "none", color : "white"}} > Go to Schedule</Link></Button>

                    </div>
                    <div className='mt-4'>

                    <Footer />
                    </div>


                </div>

            </div>

        </Fragment>








    );
};

export default MainPage;
