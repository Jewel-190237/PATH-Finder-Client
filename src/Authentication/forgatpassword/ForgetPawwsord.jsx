import { Form, Input } from "antd";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import signup from "../../assets/signup.png";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const axiosSecurePublic = useAxiosPublic();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [form] = Form.useForm();

  const auth = { phone, email };

  const onFinish = async () => {
    try {
      const response = await axiosSecurePublic.post("/forgetPassword", auth);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "User Found",
          text: ` Check Email : ${response.data.email}`,
          showConfirmButton: true,
        });
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "User Not Found",
          text: "The phone number you entered does not exist in our records. Please sign up.",
          showConfirmButton: true,
        });
        navigate("/signup");
      } else {
        Swal.fire({
          icon: "error",
          title: "Something Went Wrong",
          text: "Please try again later.",
          showConfirmButton: true,
        });
      }
    }

    form.resetFields();
  };

  return (
    <div
      className="bg-cover bg-center relative "
      style={{ backgroundImage: `url(${signup})` }}
    >
      <div className="path-container py-10 md:py-12 lg:py-16 xl:py-20 max-w-[1320px] mx-auto text-white">
        <div
          style={{ backdropFilter: "blur(50px)" }}
          className="bg-[#FF4E25] text-white mx-auto max-w-[868px] px-5 md:px-[150px] lg:px-[250px] py-10 md:py-12 lg:py-[60px] xl:py-[80px] rounded bg-opacity-10"
        >
          <p className="heading2 text-white text-center">Forgot Password</p>
          <p className="text-center mt-3">
            Please confirm your phone number below, and we will send you a
            verification code.
          </p>
          <Form
            className="mt-6 login-form md:mt-8 lg:mt-12"
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please input your Phone Number!" },
              ]}
            >
              <Input
                placeholder="Input your Phone Number"
                type="number"
                className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white !border-none description"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              className="mt-3"
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                placeholder="Input your Email"
                type="email"
                className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white !border-none description"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <button
              type="submit"
              className="common-button w-full py-4 mt-5 md:mt-6 lg:mt-8 rounded-md"
            >
              Continue
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
