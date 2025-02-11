import React from 'react';
import Navbar from '../Component/Common/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Component/Common/Footer';
import useTitle from '../Hooks/useTitle';

const MainLayout = () => {
    const location = useLocation();

    const currentRoute = location.pathname.split("/")[1]; 
    const currentTitle = location.state?.title || `${currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1)} || Service Reviews Sytem`; 
    useTitle(currentTitle)
    return (
        <div>
            <nav>
                <Navbar></Navbar>
            </nav>
            <main className='max-w-7xl mx-auto min-h-[calc(100vh-246px)] pt-16'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;