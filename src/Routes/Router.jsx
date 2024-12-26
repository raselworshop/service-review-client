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
import MyReviews from "../Pages/Userbased/MyReviews";
import MyServices from "../Pages/Userbased/MyServices";
import SearchResultPage from "../Pages/SearchResultPage";
import PrivateRoute from "./PrivateRoute";
import Partners from "../Pages/Partner/Partners";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        title: "Home - Service Reviews System"
      },
      {
        path: 'signin',
        element: <Signin></Signin>,
        title : "Signin - Services Reviews System"
      },
      {
        path: 'signup',
        element: <Signup></Signup>,
        title: "Sign Up - Service Reviews",
      },
      {
        path: 'profile',
        element: <PrivateRoute>
          <Profile></Profile>,
        </PrivateRoute>,
        title: "Profile - Service Reviews",
      },
      {
        path: 'addservice',
        element: <PrivateRoute>
          <AddService></AddService>,
        </PrivateRoute>,
        title: 'Add Service - Services Reviews System',
      },
      {
        path: 'services',
        element: <PrivateRoute>
          <AllServices></AllServices>
        </PrivateRoute>,
        title: "All Services - Service Reviews", 
        loader: async ()=>{
          const response = await axios.get(`${import.meta.env.VITE_PROD_API_URL}/servicesCount`);
          return response.data
        }
      },
      {
        path: 'service-details/:serviceId',
        element: <PrivateRoute>
          <ServiceDetails></ServiceDetails>
        </PrivateRoute>,
        title: "Service Details - Service Reviews",
      },
      {
        path: 'my-reviews',
        element: <PrivateRoute>
          <MyReviews></MyReviews>
        </PrivateRoute>,
        title: "My Reviews - Service Reviews",
      },
      {
        path: 'my-services',
        element: <PrivateRoute>
          <MyServices></MyServices>
        </PrivateRoute>,
        title: "My Services - Service Reviews",
      },
      {
        path: 'search',
        element: <SearchResultPage></SearchResultPage>,
        title: "Search Results - Service Reviews",
      },
      {
        path: 'partner-program',
        element: <Partners></Partners>,
        title: "Partner Program - Service Reviews",
      }
    ]
  },
]);

export default router;