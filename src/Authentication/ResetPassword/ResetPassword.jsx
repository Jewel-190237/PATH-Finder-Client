import { Form, Input } from "antd";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // If using React Router for navigation
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import signup from "../../assets/signup.png";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();
  const { token } = useParams();
  const navigate = useNavigate();
  const axiosSecurePublic = useAxiosPublic();

  const onFinish = async () => {
    try {
      // Send both the token and new password in the request body
      const response = await axiosSecurePublic.post("/resetPassword", {
        token,
        newPassword: password,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Password Updated",
          text: "Please login Now",
          showConfirmButton: true,
        });
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "User Not Found",
          text: "Please sign up.",
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
          <p className="heading2 text-center">Reset Password</p>
          <p className="mt-3 capitalize text-center">
            Please input a new password and try to remind it
          </p>
          <div className="mx-auto w-full flex justify-center login-form mt-5">
            <Form
              className="w-full mt-6 md:mt-8 lg:mt-12"
              onFinish={onFinish}
              form={form}
            >
              <Form.Item
                label="New Password:"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new Password!",
                  },
                ]}
              >
                <Input
                  placeholder="Input your New Password"
                  type="password"
                  className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white !border-none description"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <button
                type="submit"
                className="common-button w-full mt-4 md:mt-5 lg:mt-6 xl:mt-8 rounded-md"
              >
                Continue
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
