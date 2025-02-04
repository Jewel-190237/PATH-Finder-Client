/* eslint-disable no-unused-vars */
import { Form, Input, message } from "antd";
import { useNavigate, } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import signup from "../../assets/signup.png";

const Offer = () => {
  const navigate = useNavigate();
  const axiosSecurePublic = useAxiosPublic();
  const [form] = Form.useForm();
  const onFinish = async (value) => {
    try {
      const newUser = {
        name: value.name,
        phone: value.phone,
        whatsapp: value.whatsapp,
        telegram: value.telegram,
      };

      const response = await axiosSecurePublic.post("/offer", newUser);

      if (response.status === 200) {
        message.success("You gained 10% off");
        navigate("/all-courses",);
      }
    } catch (error) {
      message.error("Something went wrong, Please try again");
      console.error("Error:", error);
    }

    form.resetFields();
  };

  return (
    <div
      className="bg-cover bg-center relative text-white"
      style={{ backgroundImage: `url(${signup})` }}
    >
      <div className="p-10 md:p-[80px] lg:p-[100px] xl:p-[120px] path-container text-white rounded-lg">
        <div className="">
          <h2 className="heading2 text-center">
            Unlock 10% Off with Just a Few Clicks!
          </h2>
          <p className="mt-3 lg:mt-4 xl:mt-6 description text-center max-w-[480px] mx-auto">
            Fill out the form with your details and enjoy an exclusive 10%
            discount on your next purchase. It's quick, simple, and <br />{" "}
            rewarding!
          </p>
          <div
            className="max-w-[800px] rounded-[16px] border border-[#E7E7E7] mx-auto login-form my-4 md:my-8"
            style={{ backdropFilter: "blur(30px)" }}
          >
            <Form
              className="space-y-4 p-[60px]"
              onFinish={onFinish}
              form={form}
            >
              <Form.Item label="Name: " name="name" required>
                <Input
                  placeholder="Input your Name"
                  type="text"
                  className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white !border-none description"
                />
              </Form.Item>
              <Form.Item label="Phone Number: " name="phone" required>
                <Input
                  placeholder="Input your Phone Number"
                  type="number"
                  className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white !border-none description"
                />
              </Form.Item>
              <Form.Item label="Whatsapp Number: " name="whatsapp" required>
                <Input
                  placeholder="Input your Whatsapp Number"
                  type="number"
                  className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white !border-none description"
                />
              </Form.Item>
              <Form.Item label="Telegram Number: " name="telegram" required>
                <Input
                  placeholder="Input your Telegram Number"
                  type="number"
                  className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white !border-none description"
                />
              </Form.Item>

              <button
                type="submit"
                className="common-button w-full !mt-10 !rounded-md uppercase"
              >
                Claim offers
              </button>
            </Form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
