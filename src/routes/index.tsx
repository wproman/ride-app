import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";

import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Features from "@/pages/Features";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";


import { createBrowserRouter, Navigate, } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";


import { role } from "@/constance/role";
import AccountStatus from "@/pages/auth/AccountStatus";

import DriverLiveRide from "@/pages/Driver/DriverLiveRide";
import Home from "@/pages/Home";
import LiveRideTracking from "@/pages/Ride/[Live-ride]";
import RideDetails from "@/pages/Ride/RideDetails";
import Unauthorized from "@/pages/Unauthorized";
import DriverFeatures from "@/pages/User/Features/FeatureDriver";
import RiderFeatures from "@/pages/User/Features/FeaturesRider";
import { riderSidebarItems } from '@/routes/riderSidebarItems';
import { TRole } from "@/types";
import { withAuth } from "@/utils/withAuth";
import { driverSidebarItems } from "./driverSidebarItems";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Features,
        path: "features",
      },
      {
        Component: Contact,
        path: "contact",
      },
         {
        Component: FAQ,
        path: "faq",
      },
    
    ],
  },

  {
    Component: withAuth(DashboardLayout, role.ADMIN as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.RIDER as TRole),
    path: "/rider",
    children: [
      { index: true, element: <Navigate to="/rider/ride-request" /> },
      ...generateRoutes(riderSidebarItems),
   
    {
        path: '/rider/ride-details/:rideId',
        Component: RideDetails
      },
      {
        path: '/rider/live-ride/:rideId',
        Component: LiveRideTracking
      },
    ],
  },
   {
    Component: withAuth(DashboardLayout, role.DRIVER as TRole),
    path: "/driver",
    children: [
      { index: true, element: <Navigate to="/driver/driver-dashboard" /> },
      ...generateRoutes(driverSidebarItems),
{
        path: '/driver/ride-details/:rideId',
        Component: RideDetails
      },
      {
        path: '/driver/live-ride/:rideId',
        Component: DriverLiveRide
      },
    ],
  },

  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: AccountStatus,
    path: "/account-status",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
  // {
  //   Component: Success,
  //   path: "/payment/success",
  // },
  // {
  //   Component: Fail,
  //   path: "/payment/fail",
  // },
  {
    Component: RiderFeatures,
    path: "features/rider", 

  },

    {
    Component: DriverFeatures,
    path: "features/driver", 

  },
   {
    Component: DriverFeatures,
    path: "features/admin", 

  },

    
]);