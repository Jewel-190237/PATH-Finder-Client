import { Link} from "react-router-dom";
import signup from "../../assets/signup.png";
// PaymentFail
const PaymentSuccess = () => {
 
  return (
    <div
      className="bg-cover bg-center relative"
      style={{ backgroundImage: `url(${signup})` }}
    >
      <div className="path-container p-8 md:p-10 lg:p-12 xl:p-[60px] border-[1px] border-[#20010D]">
        <div
          className="py-14 md:py-16 lg:py-20 xl:py-32 max-w-[800px] rounded-[16px] bg-[#F6170C1A] border-[1px] border-[#E7E7E7] mx-auto login-form my-4 md:my-8 text-white"
          style={{ backdropFilter: "blur(10px)" }}
        >
          <p className="text-center heading">Your Payment Successfully Done</p>
          <Link className="flex justify-center" to="/studentDashboard/courses">
            <button className="mt-10 rounded-md common-button mx-auto">Continue</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
