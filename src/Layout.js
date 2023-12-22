import React, { Fragment, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'reactstrap';
import TopBar from './Pages/Realestate/TopBar';
import Footer from './Pages/Realestate/Footer';
import Sidebar from './Pages/Realestate/Menu';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Fragment>
            <TopBar />
            <Container fluid className='p-0 m-0' style={{ backgroundColor: "#f7f7f7" }}>
                <Outlet />
            </Container>
        </Fragment>
    );
};

export default Layout;
