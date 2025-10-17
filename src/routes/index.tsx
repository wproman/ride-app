import App from "@/App";
// import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Features from "@/pages/Features";
// import AccountStatus from "@/pages/auth/AccountStatus";
// import Login from "@/pages/Login";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

// import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, } from "react-router";
// import { adminSidebarItems } from "./adminSidebarItems";
// import { userSidebarItems } from "./userSidebarItems";
// import { withAuth } from "@/utils/withAuth";
// import Unauthorized from "@/pages/Unauthorized";
// import { role } from "@/constants/role";
// import { TRole } from "@/types";
// import Tours from "@/pages/Tours";
// import TourDetails from "@/pages/TourDetails";
// import Booking from "@/pages/Booking";
// import Homepage from "@/pages/Homepage";
// import Success from "@/pages/Payment/Success";
// import Fail from "@/pages/Payment/Fail";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      // {
      //   Component: Homepage,
      //   index: true,
      // },
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
      // {
      //   Component: Tours,
      //   path: "tours",
      // },
      // {
      //   Component: TourDetails,
      //   path: "tours/:id",
      // },
      // {
      //   Component: withAuth(Booking),
      //   path: "booking/:id",
      // },
    ],
  },
  // {
  //   Component: withAuth(DashboardLayout, role.superAdmin as TRole),
  //   path: "/admin",
  //   children: [
  //     { index: true, element: <Navigate to="/admin/analytics" /> },
  //     ...generateRoutes(adminSidebarItems),
  //   ],
  // },
  // {
  //   Component: withAuth(DashboardLayout, role.user as TRole),
  //   path: "/user",
  //   children: [
  //     { index: true, element: <Navigate to="/user/bookings" /> },
  //     ...generateRoutes(userSidebarItems),
  //   ],
  // },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  // {
  //   Component: AccountStatus,
  //   path: "/account-status",
  // },
  // {
  //   Component: Unauthorized,
  //   path: "/unauthorized",
  // },
  // {
  //   Component: Success,
  //   path: "/payment/success",
  // },
  // {
  //   Component: Fail,
  //   path: "/payment/fail",
  // },
]);