import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared-file/Footer/Footer";
import Navbar from "../Pages/Shared-file/Navbar/Navbar";
import CommonNav from "../Pages/Shared-file/commonNav/commonNav";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <div className="mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24">
        <Footer />
      </div>
      <CommonNav />
    </div>
  );
};

export default Main;
