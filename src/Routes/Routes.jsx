import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Authentication/Login/Login";
import SignUp from "../Authentication/SignUp/SignUp";
import ProtectedLogin from "../Authentication/ProtectLogin/ProtectedLogin";
import ProtectedAdmin from "../Authentication/ProtectedAdmin/ProtectedAdmin";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AllMaster from "../Pages/Dashboard/AllMaster/AllMaster";
import ForgetPassword from "../Authentication/forgatpassword/ForgetPawwsord";
import ResetPassword from "../Authentication/ResetPassword/ResetPassword";
import Plan from "../Pages/Plan/Plan";
import Aspire from "../Pages/Aspire/Aspire";
import Forum from "../Pages/Forum/Forum";
import Dashboard from "../Layout/Dashboard";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import ManagerDashboard from "../Layout/ManagerDashboard/ManagerDashboard";
import ManagerOverview from "../Pages/Manager/ManagerOverview";
import MarketingOverview from "../Pages/Marketing/MarketingOverview";
import { Virtual } from "swiper/modules";
import VirtualAssistantOverview from "../Pages/VirtualAssistant/SalesDirector";
import VirtualAssistantDashboard from "../Layout/VirtualAssistant/VirtualAssistantDashboard";
import SalesDirectorDashboard from "../Layout/SalesDirector/SalesDirectorDashboard";
import SalesDirectorOverview from "../Pages/SalesDirector/SalesDirector";
import DevAdvisorDashboard from "../Layout/DevAdvisor/DevAdvisorDashboard";
import DevAdvisorOverview from "../Pages/DevVisor/DevAdvisor";
import SkillSpecialistDashboard from "../Layout/SkillSpecialist/SkillSpecilistDashboard";
import SkillSpecialistOverview from "../Pages/SkillSpecialist/SkillSpecialist";
import SkillStrategistDashboard from "../Layout/SkillStrategist/SkillStrategistDashboard";
import SkillStrategistOverview from "../Pages/SkillStrategist/SkillStrategist";
import MarketingDashboard from "../Layout/MarketingExecutive/MarketingDashboard";

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
            <Login />
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

  // Admin Dashboard
  {
    path: "dashboard",
    element: (
      <ProtectedAdmin>
        {" "}
        <Dashboard />{" "}
      </ProtectedAdmin>
    ),
    children: [
      {
        path: "adminHome",
        element: <AdminHome />,
      },
      {
        path: "users",
        element: <AllUsers />,
      },
      {
        path: "subAdmin",
        element: <AllMaster />,
      },
      {
        path: "adminDashboard",
        element: <AdminDashboard />,
      },
    ],
  },

  //Manager Dashboard
  {
    path: "managerDashboard",
    element: <ManagerDashboard />,
    children: [
      {
        path: "managerHome",
        element: <ManagerOverview />,
      },
    ],
  },

  //Marketing Executive Dashboard
  {
    path: "marketingDashboard",
    element: <MarketingDashboard />,
    children: [
      {
        path: "marketingHome",
        element: <MarketingOverview />,
      },
    ],
  },

  //Skill Strategist Dashboard
  {
    path: "skillStrategist",
    element: <SkillStrategistDashboard />,
    children: [
      {
        path: "strategistHome",
        element: <SkillStrategistOverview />,
      },
    ],
  },

  //Skill Specialist Dashboard
  {
    path: "skillSpecialist",
    element: <SkillSpecialistDashboard />,
    children: [
      {
        path: "specialistDashboard",
        element: <SkillSpecialistOverview />,
      },
    ],
  },



  //Dev Advisor Dashboard
  {
    path: "devAdvisorDashboard",
    element: <DevAdvisorDashboard />,
    children: [
      {
        path: "advisorHome",
        element: <DevAdvisorOverview />,
      },
    ],
  },

  //Sales Director Dashboard
  {
    path: "salesDirectorDashboard",
    element: <SalesDirectorDashboard />,
    children: [
      {
        path: "directorHome",
        element: <SalesDirectorOverview />,
      },
    ],
  },

  //Virtual Assistant Dashboard
  {
    path: "virtualAssistantDashboard",
    element: <VirtualAssistantDashboard />,
    children: [
      {
        path: "assistantHome",
        element: <VirtualAssistantOverview />,
      },
    ],
  },
]);
