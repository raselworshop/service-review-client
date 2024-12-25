import React from 'react';
import Navbar from '../Component/Common/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Component/Common/Footer';

const MainLayout = () => {
    return (
        <div className='max-w-full mx-auto'>
            <nav>
                <Navbar></Navbar>
            </nav>
            <main className='min-h-[calc(100vh-246px)] pt-16'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;