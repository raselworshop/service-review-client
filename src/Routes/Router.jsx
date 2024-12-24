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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
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
        element: <PrivateRoute>
          <Profile></Profile>,
        </PrivateRoute>
      },
      {
        path: 'addservice',
        element: <PrivateRoute>
          <AddService></AddService>,
        </PrivateRoute>
      },
      {
        path: 'services',
        element: <PrivateRoute>
          <AllServices></AllServices>
        </PrivateRoute>
      },
      {
        path: 'service-details/:serviceId',
        element: <PrivateRoute>
          <ServiceDetails></ServiceDetails>
        </PrivateRoute>
      },
      {
        path: 'my-reviews',
        element: <PrivateRoute>
          <MyReviews></MyReviews>
        </PrivateRoute>
      },
      {
        path: 'my-services',
        element: <PrivateRoute>
          <MyServices></MyServices>
        </PrivateRoute>
      },
      {
        path: 'search',
        element: <SearchResultPage></SearchResultPage>
      },
      {
        path: 'partner-program',
        element: <Partners></Partners>
      }
    ]
  },
]);

export default router;