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
// import Profile from "../Pages/Profile/Profile";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import ManagerDashboard from "../Layout/ManagerDashboard/ManagerDashboard";
import ManagerOverview from "../Pages/HeadOfMarketing/ManagerOverview";
import MarketingOverview from "../Pages/MarketingExecutive/MarketingOverview";
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
import ControlPanel from "../Pages/Dashboard/AdminDashboard/ControlPanel";
import CEODashboard from "../Layout/CEO/CEODashboard";
import CEOOverview from "../Pages/CEO/CEOOverview";
import HeadOfMarketing from "../Pages/CEO/HeadOfMarketing";
import SalesDirector from "../Pages/CEO/SalesDirector";
import MarketingExecutive from "../Pages/HeadOfMarketing/MarketingExecutive";
import SkillStrategist from "../Pages/MarketingExecutive/SkillStragist";
import SkillSpecialist from "../Pages/SkillStrategist/SkillSpecialist";
import DevAdvisor from "../Pages/SkillSpecialist/DevAdvisor";
import VirtualAssistant from "../Pages/SalesDirector/VirtualAssistant";
import PremiumServices from "../Pages/Premium/PremiumServices";
import EarnRewards from "../Pages/Home/Home/EarnRewards";
import TeamGrid from "../Pages/Team/TeamGrid";
import Profile from "../Pages/Profile/Profile";
import AxisPoint from "../Pages/AxisPoint/AxisPoint";
import EditProfile from "../Pages/Profile/UpdateProfile";
import CEOMembers from "../Pages/CEO/CEOMembers";
import HeadOfMarketingMembers from "../Pages/HeadOfMarketing/HeadOfMarketingMembers";
import MarketingExecutiveMembers from "../Pages/MarketingExecutive/MarketingExecutiveMembers";
import SkillStrategistMembers from "../Pages/SkillStrategist/SkillStrategistMembers";
import SkillSpecialistMembers from "../Pages/SkillSpecialist/SkillSpecialistMembers";
import DevAdvisorMembers from "../Pages/DevVisor/DevAdvisorMembers";
import SalesDirectorMembers from "../Pages/SalesDirector/SalesDirectorMembers";
import VirtualAssistantMembers from "../Pages/VirtualAssistant/VirtulaAssistantMembers";
import CourseDetails from "../Pages/Home/Course/CourseDetails";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import PaymentFail from "../Pages/Payment/PaymentFail";
import AllCourses from "../Pages/Dashboard/Courses/Courses";

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
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/axisPoint",
        element: <AxisPoint />,
      },
      {
        path: "/premiumServe",
        element: <PremiumServices />,
      },
      {
        path: "/afterLog",
        element: <EarnRewards />,
      },
      {
        path: "/team",
        element: <TeamGrid />,
      },
      {
        path: "/editProfile",
        element: <EditProfile />,
      },
      {
        path: "/forgetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "/resetPassword/:token",
        element: <ResetPassword />,
      },
      {
        path: "/course",
        element: <CourseDetails />,
      },
      {
        path: '/payment/success',
        element: <PaymentSuccess/>
      },
      {
        path: '/payment/fail',
        element: <PaymentFail/>
      }
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
        path: "courses",
        element: <AllCourses />,
      },
      {
        path: "adminDashboard",
        element: <AdminDashboard />,
      },
      {
        path: "controlPanel",
        element: <ControlPanel />,
      },
    ],
  },

  //CEO Dashboard
  {
    path: "CEODashboard",
    element: <CEODashboard />,
    children: [
      {
        path: "CEOHome",
        element: <CEOOverview />,
      },
      {
        path: "headOfMarketing",
        element: <HeadOfMarketing />,
      },
      {
        path: "salesDirector",
        element: <SalesDirector />,
      },
      {
        path: "students",
        element: <CEOMembers />,
      },
    ],
  },

  //Head of Marketing Dashboard
  {
    path: "managerDashboard",
    element: <ManagerDashboard />,
    children: [
      {
        path: "managerHome",
        element: <ManagerOverview />,
      },
      {
        path: "marketingExecutive",
        element: <MarketingExecutive />,
      },
      {
        path: "students",
        element: <HeadOfMarketingMembers />,
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
      {
        path: "skillStrategist",
        element: <SkillStrategist />,
      },
      {
        path: "students",
        element: <MarketingExecutiveMembers />,
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
      {
        path: "skillSpecialist",
        element: <SkillSpecialist />,
      },
      {
        path: "students",
        element: <SkillStrategistMembers />,
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
      {
        path: "devAdvisor",
        element: <DevAdvisor />,
      },
      {
        path: "students",
        element: <SkillSpecialistMembers />,
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
      {
        path: "salesDirector",
        element: <SalesDirector />,
      },
      {
        path: "students",
        element: <DevAdvisorMembers />,
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
      {
        path: "virtualAssistant",
        element: <VirtualAssistant />,
      },
      {
        path: "students",
        element: <SalesDirectorMembers />,
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
      {
        path: "students",
        element: <VirtualAssistantMembers />,
      },
    ],
  },
]);
