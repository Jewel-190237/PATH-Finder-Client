import FAQ from "../../FAQ/Faq";
import Banner from "./Banner";
import ExplorePics from "./ExplorePics";
import LeaderBoard from "./LeaderBoard";
import Leap from "./Leap";
import Review from "./Review";
import Service from "./Service";
import VideoFrame from "./VideoFrame";

const Home = () => {

    return (
        <section>
             <Banner/>
             <Service/>
             <ExplorePics/>
             <VideoFrame/>
             <FAQ/>
             <LeaderBoard/>
             <Review/>
             <Leap/>
        </section>
    );
};

export default Home;
