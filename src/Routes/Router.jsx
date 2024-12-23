import { createBrowserRouter, } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Signin from "../Pages/authentication/Signin";
import Signup from "../Pages/authentication/Signup";
import Profile from "../Pages/Profile";
import AddService from "../Pages/AddService";
import AllServices from "../Pages/AllServices";
import ServiceDetails from "../Pages/ServiceDetails";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
        {
          index:true,
          element: <Home></Home>,
        },
        {
          path: 'signin',
          element: <Signin></Signin>,
        },
        {
          path: 'signup',
          element: <Signup></Signup>
        },
        {
          path: 'profile',
          element:<Profile></Profile>,
        },
        {
          path: 'addservice',
          element: <AddService></AddService>,
        },
        {
          path: 'services',
          element: <AllServices></AllServices>
        },
        {
          path: 'service-details/:serviceId',
          element: <ServiceDetails></ServiceDetails>
        }
      ]
    },
  ]);

  export default router;