import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared-file/Footer/Footer";
import Navbar from "../Pages/Shared-file/Navbar/Navbar";
import CommonNav from "../Pages/Shared-file/commonNav/commonNav";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <CommonNav />
    </div>
  );
};

export default Main;
