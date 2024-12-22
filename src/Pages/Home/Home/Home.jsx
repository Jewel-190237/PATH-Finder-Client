import FAQ from "../../FAQ/Faq";
import CommonNav from "../../Shared-file/commonNav/commonNav";
import Banner from "./Banner";
import Leap from "./Leap";
import Review from "./Review";

const Home = () => {

    return (
        <section>
             <Banner/>
             <FAQ/>
             <Review/>
             <Leap/>
        </section>
    );
};

export default Home;