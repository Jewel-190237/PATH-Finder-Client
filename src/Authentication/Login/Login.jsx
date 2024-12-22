import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form, Input } from "antd";
import signup from "../../assets/signup.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const returnLocation = useLocation;
  const from = returnLocation.state?.from?.pathname || "/";

  const userRole = ["student", "subAdmin", "admin"];
  const [activeRole, setActiveRole] = useState("student");

  const onFinish = async (values) => {
    console.log({ ...values, activeRole });
    try {
      // Send phone, password, and role to the server
      const response = await axios.post("http://localhost:5000/login", {
        phone: values.phone,
        password: values.password,
        role: activeRole,
      });

      console.log("Server Response:", response.data);

      Swal.fire({
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 2000,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);

      // Check if the error is due to role mismatch (403)
      if (error.response && error.response.status === 403) {
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "The role does not match. Please select the correct role.",
        });
      } else if (error.response && error.response.status === 402) {
        Swal.fire({
          icon: "error",
          title: "User Not Found",
          text: "User not found in Your input data. Please Login.",
        });
      }
      // Check if user credentials are wrong (401)
      else if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text:
            error.response.data.message || "Invalid phone number or password",
        });
      } else {
        // General error message
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: "An error occurred. Please try again later.",
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
      <div className="path-container p-8 md:p-10 lg:p-12 xl:p-[60px] border-[1px] border-[#20010D]">
        <div className="text-white">
          <h2 className="heading2 text-center">Welcome Back! <br /> Access Your Account Now.</h2>
          <div className="mt-3 md:mt-4 lg:mt-5 xl:mt-6 flex items-center justify-center gap-2 md:gap-3 lg:gap-4 xl:gap-5">
            {userRole.map((role) => (
              <button
                onClick={() => {
                  setActiveRole(role);
                }}
                key={role}
                className={`py-1 px-2 md:px-1 lg:px-4 xl:px-6 rounded-b-xl ${
                  activeRole === role
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : ""
                }`}
              >
                <span className="capitalize description">{role}</span>
              </button>
            ))}
          </div>
          <div
            className="max-w-[800px] rounded-[16px] bg-[#F6170C1A] border border-[#E7E7E7] mx-auto login-form my-4 md:my-8"
            style={{ backdropFilter: "blur(30px)" }}
          >
            <Form
              className="space-y-4 p-[60px]"
              onFinish={onFinish}
              form={form}
            >
              <Form.Item label="Phone Number: " name="phone" required>
                <Input
                  placeholder="Input your Phone Number"
                  type="number"
                  className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white !border-none description"
                />
              </Form.Item>
              <Form.Item label="Password" name="password" required>
                <Input
                  placeholder="Input your password"
                  type="password"
                  className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white !border-none description"
                />
              </Form.Item>
              <button
                type="submit"
                className="common-button w-full !mt-10 !rounded-md"
              >
                Sign In
              </button>
              <Link to="/ForgetPassword">
                <p className="text-right mt-3 text-white description">
                  Forgot Password?
                </p>
              </Link>
            </Form>
            <p className="mb-6 !-mt-10 text-center text-white">
              New Here?{" "}
              <Link to="/signup" className="underline text-primary font-bold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
