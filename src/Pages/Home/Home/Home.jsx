import FAQ from "../../FAQ/Faq";
import Banner from "./Banner";
import ExplorePics from "./ExplorePics";
import LeaderBoard from "./LeaderBoard";
import Leap from "./Leap";
import Review from "./Review";

const Home = () => {

    return (
        <section>
             <Banner/>
             <ExplorePics/>
             <FAQ/>
             <LeaderBoard/>
             <Review/>
             <Leap/>
        </section>
    );
};

export default Home;
