import FAQ from "../../FAQ/Faq";
import Banner from "./Banner";
import LeaderBoard from "./LeaderBoard";
import Leap from "./Leap";
import Review from "./Review";

const Home = () => {

    return (
        <section>
             <Banner/>
             <FAQ/>
             <LeaderBoard/>
             <Review/>
             <Leap/>
        </section>
    );
};

export default Home;
