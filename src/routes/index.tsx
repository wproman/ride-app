import App from "@/App";

import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";

import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    {
         path: "/",
         Component: App,
         children: [
            {
                Component: About,
                path: "about",
            }
         ]
    },
    {
        Component: Login,
        path: "login"
    },
    {
        Component: Register,
        path: "register"
    },
    {
        Component:Verify,
        path:"verify"
    }
]);


