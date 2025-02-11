import React from 'react';
import { FaCloud } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from "motion/react"

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content py-10 pl-5 lg:pl-8">
            <main className='footer'>
                <aside>
                    <div className='flex items-center justify-center'>
                        <Link to={'/'} className='flex items-center justify-center'>
                            <span><FaCloud className='text-green-700 text-2xl lg:hidden mr-2' /> </span>
                            <span className="hover mr-2 font-bold text-2xl  md:text-3xl lg:text-4xl">
                                <motion.span
                                    animate={{ color: ['#33f7bc', '#33f74e'] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >Service</motion.span> Review</span>
                            <span>
                                <FaCloud className='text-green-700 text-2xl hidden lg:block  md:text-3xl lg:text-4xl' />
                            </span>
                        </Link>
                    </div>
                    <p>
                        ACME Industries Ltd.
                        <br />
                        Providing reliable tech since 1992
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </main>
            <footer className="flex flex-col py-4 text-center mt-8">
                <p className='flex items-center'> <span className='mr-2'>&copy; 2024 All Rights Reserved.</span>
                    <span className="hover mr-2 font-bold text-2xl  md:text-3xl lg:text-4xl">
                        <motion.span
                            animate={{ color: ['#33f7bc', '#33f74e'] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >Service</motion.span> Review</span>
                    <span>
                        <FaCloud className='text-green-700 text-2xl hidden lg:block  md:text-3xl lg:text-4xl' />
                    </span>
                    
                    </p>
                <p>Developed by <a href="https://yourportfolio.com" className="text-blue-400 hover:underline">Md. Rasel</a>.</p>
            </footer>
        </footer>
    );
};

export default Footer;