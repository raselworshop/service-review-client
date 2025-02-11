import React, { useState } from "react";
import { FaCloud } from "react-icons/fa";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { motion } from "motion/react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, signOutUser } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isMobileSearch, setIsMobileSearch] = useState(false);

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              text: "You're logged out.",
              icon: "success",
            });
            navigate("/");
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: `${error.message}`,
              icon: "error",
            });
          });
      }
    });
  };

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "btn btn-accent btn-sm hover:btn-primary"
              : "hover:btn-primary hover:btn-sm hover:btn"
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li>
        {location.pathname === "/" ? (
          <a href="#services">Services</a>
        ) : (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "btn btn-accent btn-sm hover:btn-primary"
                : "hover:btn-primary hover:btn-sm hover:btn"
            }
            to={"/services"}
          >
            Services
          </NavLink>
        )}
      </li>
      {user && (
        <>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "btn btn-accent btn-sm hover:btn-primary"
                  : "hover:btn-primary hover:btn-sm hover:btn"
              }
              to={"/addservice"}
            >
              Add Service
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "btn btn-accent btn-sm hover:btn-primary"
                  : "hover:btn-primary hover:btn-sm hover:btn"
              }
              to={"/my-reviews"}
            >
              My Reviews
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "btn btn-accent btn-sm hover:btn-primary"
                  : "hover:btn-primary hover:btn-sm hover:btn"
              }
              to={"/my-services"}
            >
              My Services
            </NavLink>
          </li>
        </>
      )}
      {!user && (
        <>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "btn btn-accent btn-sm hover:btn-primary"
                  : "hover:btn-primary hover:btn-sm hover:btn"
              }
              to={"/signin"}
            >
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "btn btn-accent btn-sm hover:btn-primary"
                  : "hover:btn-primary hover:btn-sm hover:btn"
              }
              to={"/signup"}
            >
              Sign Up
            </NavLink>
          </li>
        </>
      )}
      <div className="flex justify-between items-center">
        {user && (
          <li className="lg:hidden">
            <button
              className="btn btn-accent hover:btn-primary btn-sm"
              onClick={handleSignOut}
            >
              Logout
            </button>
          </li>
        )}
        <ThemeToggle className="lg:ml-2 p-3 lg:m-0" />
      </div>
    </>
  );
  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/search?query=${search}`);
    }
  };
  const toggle = () => {
    setIsMobileSearch(!isMobileSearch);
  };
  // console.log(search)
  return (
    <div className="bg-accent/50 fixed top-0 z-50 backdrop-blur-md w-full">
      <div className="navbar max-w-7xl  mx-auto">
        <div className="navbar-start w-4/5 mx-auto">
          <div className="flex items-center justify-center mb-2">
            <Link to={"/"} className="flex items-center justify-center">
              <span>
                <FaCloud className="text-green-700 text-2xl lg:hidden mr-2" />{" "}
              </span>
              <span className="hover mr-2 font-bold text-2xl  md:text-3xl lg:text-4xl">
                <motion.span
                  animate={{ color: ["#33f7bc", "#33f74e"] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Service
                </motion.span>{" "}
                Review
              </span>
              <span>
                <FaCloud className="text-green-700 text-2xl hidden lg:block  md:text-3xl lg:text-4xl" />
              </span>
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <div>
            <label className="input input-bordered w-full flex items-center gap-2">
              {/* search field  */}
              <input
                type="text"
                className="grow w-full"
                placeholder="Search with title, category, company name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={handleSearch}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </label>
          </div>
          <ul className="menu menu-horizontal px-2 space-x-3">{links}</ul>
        </div>
        <div className="navbar-end w-1/3">
          {/* for mobile: search impleament */}
          <div className="md:hidden mr-3">
            <button onClick={toggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-8 w-8 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {isMobileSearch && (
            <div className="absolute top-16 left-0 w-full p-4 shadow-lg z-10">
              <label className="input input-bordered w-full flex items-center gap-2">
                <input
                  type="text"
                  className="grow w-full"
                  placeholder="Search with title, category, company name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)} // Handle input change
                />
                <button onClick={handleSearch}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </label>
            </div>
          )}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow"
            >
              {/* profile info  */}
              <div className="p-4 rounded my-2">
                <Link
                  className=" flex items-center justify-between"
                  to={"/profile"}
                >
                  {" "}
                  <span>{user ? user.displayName : "Profile"}</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user?.photoURL || "https://i.ibb.co/9r0LmCV/boy1.png"}
                    alt=""
                  />
                </Link>
              </div>
              {links}
            </ul>
          </div>
          {/* profile info */}
          <div className="hidden lg:flex relative">
            <div className="flex items-center justify-between group">
              <Link to={"/profile"}>
                {!user?.photoURL ? (
                  <img
                    className="w-10 h-10 rounded-lg"
                    src="https://i.ibb.co/9r0LmCV/boy1.png"
                    alt=""
                  />
                ) : (
                  <img
                    className="w-10 h-10 rounded-lg"
                    src={user?.photoURL}
                    alt=""
                  />
                )}
              </Link>
              {user && (
                <div className="hidden group-hover:block absolute top-8 right-0 shadow-lg rounded-lg p-4 z-50 base-100 backdrop-blur-xl">
                  <div
                    className="flex items-center justify-between mb-2 tooltip tooltip-left"
                    data-tip="Click to move profile page"
                  >
                    <span>{user?.displayName}</span>
                    <Link to={"/profile"}>
                      <img
                        className="w-10 h-10 rounded-lg"
                        src={
                          user?.photoURL || "https://i.ibb.co/9r0LmCV/boy1.png"
                        }
                        alt="User Profile"
                      />
                    </Link>
                  </div>
                  <button
                    className="btn btn-accent btn-sm hover:btn-primary"
                    onClick={handleSignOut}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
