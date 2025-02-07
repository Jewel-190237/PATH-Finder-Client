import { useEffect, useState } from "react";
import FAQ from "../../FAQ/Faq";
import Footer from "../../Shared-file/Footer/Footer";
import Banner from "./Banner";
import ExplorePics from "./ExplorePics";
import LeaderBoard from "./LeaderBoard";
import Leap from "./Leap";
import Review from "./Review";
import Service from "./Service";
import VideoFrame from "./VideoFrame";
import GetUser from "../../../Backend/GetUser";
import EarnRewards from "./EarnRewards";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const user = GetUser();
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <section>
      {currentUser ? (
        <>
          <Banner />
        <div className="pt-10 bg-[#20010D] -mt-20">
        <EarnRewards />
        </div>
          <Review />
        </>
      ) : (
        <>
          <Banner />
          <Service />
          <Review />
          <LeaderBoard />
          <VideoFrame />
          <ExplorePics />
          <FAQ />
          <Leap />
          <Footer />
        </>
      )}
    </section>
  );
};

export default Home;
