import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Authentication/Login/Login";
import SignUp from "../Authentication/SignUp/SignUp";
import ProtectedLogin from "../Authentication/ProtectLogin/ProtectedLogin";
import About from "../Pages/About/About";
import AllFaq from "../Pages/FAQ/AllFaq";
import ContactPage from "../Pages/Contact/ContactPage";
import ProtectedAdmin from "../Authentication/ProtectedAdmin/ProtectedAdmin";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AllMaster from "../Pages/Dashboard/AllMaster/AllMaster";
import ForgetPassword from "../Authentication/forgatpassword/ForgetPawwsord";
import ResetPassword from "../Authentication/ResetPassword/ResetPassword";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import PaymentFail from "../Pages/Payment/PaymentFail";
import AddBus from "../Pages/Dashboard/AddBus/AddBus";
import AddRoute from "../Pages/Dashboard/AddRoute/AddRoute";
import RouteManage from "../Pages/Dashboard/RouteManage/RouteManage";
import ManageBus from "../Pages/Dashboard/ManageBus/ManageBus";
import Profile from "../Pages/Dashboard/Profile/Profile";
import Payment from "../Pages/Dashboard/Payment/Payment";
import CounterPayment from "../Pages/Dashboard/CounterPayment/CounterPayment";
import Ticket from "../Pages/Ticket/Ticket";
import Plan from "../Pages/Plan/Plan";
import Aspire from "../Pages/Aspire/Aspire";
import Forum from "../Pages/Forum/Forum";
import Dashboard from "../Layout/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: (
          <ProtectedLogin>
            {" "}
            <Login />{" "}
          </ProtectedLogin>
        ),
      },

      {
        path: "/signup",
        element: <SignUp />,
      },
      // {
      //   path: '/service/:id',
      //   element: <AllService />
      // },

      // {
      //   path: '/about',
      //   element: <About />
      // },
      {
        path: "/plan",
        element: <Plan />,
      },
      {
        path: "/aspire",
        element: <Aspire />,
      },
      {
        path: "/forum",
        element: <Forum />,
      },
      {
        path: "/forgetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "/resetPassword/:token",
        element: <ResetPassword />,
      },
      // {
      //   path: '/payment/success/:tran_id',
      //   element: <PaymentSuccess/>
      // },
      // {
      //   path: '/payment/fail/:tran_id',
      //   element: <PaymentFail/>
      // }
    ],
  },
  {
    path: "dashboard",
    element: (
      <ProtectedAdmin>
        <Dashboard />
      </ProtectedAdmin>
    ),
    children: [
      {
        // /dashboard/overview
        path: "adminHome",
        element: (
          <ProtectedAdmin>
            <AdminHome />
          </ProtectedAdmin>
        ),
      },
      {
        path: "users",
        element: <AllUsers />,
      },
      {
        path: "subAdmin",
        element: <AllMaster />,
      },
      //     {
      //       path: 'addBus',
      //       element: <AddBus/>
      //     },
      //     {
      //       path: 'manageBus',
      //       element: <ManageBus/>
      //     },
      //     {
      //       path: 'addRoute',
      //       element: <AddRoute/>
      //     },
      //     {
      //       path: 'routeManage',
      //       element: <RouteManage/>
      //     },
      //     {
      //       path: 'profile',
      //       element: <Profile/>
      //     },
      //     {
      //       path: 'payment',
      //       element: <Payment/>
      //     },
      //     {
      //       path: 'counterPayment',
      //       element: <CounterPayment/>
      //     },
    ],
  },
]);
