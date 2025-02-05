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
import ManagerOverview from "../Pages/HeadOfMarketing/ManagerOverview";
import MarketingOverview from "../Pages/MarketingExecutive/MarketingOverview";
import VirtualAssistantOverview from "../Pages/VirtualAssistant/VirtualAssistantOverview";
import VirtualAssistantDashboard from "../Layout/VirtualAssistant/VirtualAssistantDashboard";
import SalesDirectorDashboard from "../Layout/SalesDirector/SalesDirectorDashboard";
import SalesDirectorOverview from "../Pages/SalesDirector/SalesDirectorOverview";
import DevAdvisorDashboard from "../Layout/DevAdvisor/DevAdvisorDashboard";
import DevAdvisorOverview from "../Pages/DevVisor/DevAdvisorOverview";
import SkillSpecialistDashboard from "../Layout/SkillSpecialist/SkillSpecilistDashboard";
import SkillSpecialistOverview from "../Pages/SkillSpecialist/SkillSpecialistOverview";
import SkillStrategistDashboard from "../Layout/SkillStrategist/SkillStrategistDashboard";
import SkillStrategistOverview from "../Pages/SkillStrategist/SkillStrategistOverview";
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
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import PaymentFail from "../Pages/Payment/PaymentFail";
import Courses from "../Pages/Home/AllCourse/AllCourse";
import AllCourses from "../Pages/Dashboard/Courses/Courses";
import CourseDetails from "../Pages/Home/AllCourse/CourseDetails";
import StudentDashboard from "../Layout/StudentDashboard/SrudentDashboard";
import StudentOverview from "../Pages/Student/StudentOverview";
import StudentCourse from "../Pages/Student/StudentCourse";
import Assignment from "../Pages/Student/Assignment";
import Projects from "../Pages/Dashboard/AdminDashboard/Projects";
import Announcement from "../Pages/Dashboard/AdminDashboard/Announcement";
import Post from "../Pages/Student/Post";
import AdminPost from "../Pages/Dashboard/AdminDashboard/AdminPost";
import MarketingPost from "../Pages/HeadOfMarketing/MarketingPost";
import AllFaq from "../Pages/FAQ/AllFaq";
import CEOPost from "../Pages/CEO/CEOPost";
import MarketingExecutivePost from "../Pages/MarketingExecutive/MarketingExecutivePost";
import SkillStrategistPost from "../Pages/SkillStrategist/SkillStrategistPost";
import SkillSpecialistPost from "../Pages/SkillSpecialist/SkillSpecialistPost";
import DevAdvisorPost from "../Pages/DevVisor/DevAdvisorPost";
import SalesDirectorPost from "../Pages/SalesDirector/SalesDirectorPost";
import VirtualAssistantPost from "../Pages/VirtualAssistant/VirtualAssistantPost";
import Review from "../Pages/Review/Review";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import About from "../Pages/About/About";
import ContactPage from "../Pages/ContactPage/ContactPage";
import Offer from "../Pages/Offer/Offer";
// import AllFaq from "../Pages/FAQ/AllFaq";

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
      {
        path: "/all-courses",
        element: <Courses />,
      },
      {
        path: "/course/:id",
        element: <CourseDetails />,
      },
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
        path: "/offer",
        element: <Offer />,
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
        path: "faq",
        element: <AllFaq />,
      },
      {
        path: "/premiumServe",
        element: <PremiumServices />,
      },
      {
        path: "/team",
        element: <TeamGrid />,
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
        path: "/payment/success",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment/fail",
        element: <PaymentFail />,
      },
      {
        path: "/userProfile/profile",
        element: <PaymentFail />,
      },
      {
        path: "/review",
        element: <Review/>,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy/>,
      },
      {
        path: "/about",
        element: <About/>,
      },
      {
        path: "/contact",
        element: <ContactPage/>,
      },
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
        path: "adminDashboard",
        element: <AdminDashboard />,
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
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "announcements",
        element: <Announcement />,
      },
      {
        path: "posts",
        element: <AdminPost />,
      },
      {
        path: "profile",
        element: <EditProfile />,
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
      {
        path: "profile",
        element: <EditProfile />,
      },
      {
        path: "posts",
        element: <CEOPost />,
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
      {
        path: "posts",
        element: <MarketingPost />,
      },
      {
        path: "profile",
        element:  <EditProfile />,
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
      {
        path: "profile",
        element: <EditProfile />,
      },
      {
        path: "posts",
        element: <MarketingExecutivePost />,
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
      {
        path: "profile",
        element: <EditProfile />,
      },
      {
        path: "posts",
        element: <SkillStrategistPost />,
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
      {
        path: "profile",
        element: <EditProfile />,
      },
      {
        path: "posts",
        element: <SkillSpecialistPost />,
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
      {
        path: "profile",
        element: <EditProfile />,
      },
      {
        path: "posts",
        element: <DevAdvisorPost />,
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
      {
        path: "profile",
        element: <EditProfile />,
      },
      {
        path: "posts",
        element: <SalesDirectorPost />,
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
      {
        path: "profile",
        element: <EditProfile />,
      },
      {
        path: "posts",
        element: <VirtualAssistantPost />,
      },
    ],
  },
  //Student Dashboard
  {
    path: "studentDashboard",
    element: <StudentDashboard />,
    children: [
      {
        path: "studentHome",
        element: <StudentOverview />,
      },
      {
        path: "courses",
        element: <StudentCourse />,
      },
      {
        path: "assignments",
        element: <Assignment />,
      },
      {
        path: "post",
        element: <Post />,
      },
      {
        path: "profile",
        element: <EditProfile />,
      },
    ],
  },
]);
