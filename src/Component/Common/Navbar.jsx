import React from 'react';
import { FaCloud } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UseAuth from '../../Hooks/UseAuth';

const Navbar = () => {
    const { user } = UseAuth();
    const links = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/signin'}>Sign In</Link></li>
    </>
    return (
        <div className="navbar bg-blue-700/20">
            <div className="navbar-start lg:pl-5">

                <div className='flex items-center justify-center'>
                    <span><FaCloud className='text-green-700 text-2xl lg:hidden mr-2' /> </span>
                    <a className="hover mr-2 font-bold text-2xl  md:text-3xl lg:text-4xl">Service Review</a>
                    <span><FaCloud className='text-green-700 text-2xl hidden lg:block  md:text-3xl lg:text-4xl' /> </span>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <div>
                    <label className="input input-bordered w-full flex items-center gap-2">
                        <input type="text" className="grow w-full" placeholder="Search with title, category, company name" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </label>
                </div>
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end lg:pr-5">
                {/* for mobile: search impleament */}
                <div className='md:hidden mr-3'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-8 w-8 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {/* profile info  */}
                        <div className='p-4 rounded my-2 bg-gray-500'>
                            <Link className=' flex items-center justify-between' to={'/profile'}> <span>Profile</span>
                                <img className='bg-white/20 w-8 h-8 rounded-full' src={user?.photoURL} alt="" />
                            </Link>
                        </div>
                        {links}
                    </ul>
                </div>
                {/* profile info */}
                <div className='hidden lg:flex'>
                    <div className='flex items-center justify-between'>
                        <Link to={'/profile'}>
                            {!user?.photoURL ? <span>Profile</span> :
                                <img className='w-10 h-10 rounded-lg' src={user?.photoURL} alt="" />
                            }
                        </Link>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Navbar;