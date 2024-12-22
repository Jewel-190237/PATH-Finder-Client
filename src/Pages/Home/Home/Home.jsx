import FAQ from "../../FAQ/Faq";
import CommonNav from "../../Shared-file/commonNav/commonNav";
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
