import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form, Input, message } from "antd";
import signup from "../../assets/signup.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const userRole = ["student", "subAdmin", "admin"];
  const [activeRole, setActiveRole] = useState("student");

  const onFinish = async (values) => {
    try {
      const response = await axios.post("https://api3.pathxfinder.com/login", {
        phone: values.phone,
        password: values.password,
        role: activeRole,
      });

      message.success("Login successful");

      const { token, userId, role, subRole } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      if (role === "admin") {
        navigate("/dashboard/adminHome");
      } else if (subRole === "CEO") {
        navigate("/CEODashboard/CEOHome");
      } else if (subRole === "Marketing Panel") {
        navigate("/managerDashboard/managerHome");
      } else if (subRole === "Marketing Executive") {
        navigate("/marketingDashboard/marketingHome");
      } else if (subRole === "Skill Strategist") {
        navigate("/skillStrategist/strategistHome");
      } else if (subRole === "Skill Specialist") {
        navigate("/skillSpecialist/specialistDashboard");
      } else if (subRole === "Dev Advisor") {
        navigate("/devAdvisorDashboard/advisorHome");
      } else if (subRole === "Sales Director") {
        navigate("/salesDirectorDashboard/directorHome");
      } else if (subRole === "Virtual assistant") {
        navigate("/virtualAssistantDashboard/assistantHome");
      } else if (role === "student") {
        navigate("/studentDashboard/studentHome");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response && error.response.status === 403) {
        message.error("Access Denied, The role does not match");
      } else if (error.response && error.response.status === 402) {
        message.error("User not found!, Please sign up");
        navigate("/signup");
      } else if (error.response && error.response.status === 401) {
        message.error("Invalid credentials, Please try again");
      } else {
        message.error("Something went wrong");
      }
    }

    form.resetFields();
  };

  return (
    <div
      className="bg-cover bg-center relative"
      style={{ backgroundImage: `url(${signup})` }}
    >
      <div className="path-container p-8 md:p-10 lg:p-12 xl:p-[60px] border-[1px] border-[#20010D]">
        <div className="text-white">
          <h2 className="heading2 text-center">
            Welcome Back! <br /> Access Your Account Now.
          </h2>
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
              <Form.Item
                label="Phone Number: "
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number!",
                  },
                ]}
              >
                <Input
                  placeholder="Input your Phone Number"
                  type="number"
                  className="p-2 md:p-3 lg:p-4 xl:p-5 bg-[#78120D] text-white !border-none description"
                />
              </Form.Item>
              <Form.Item
                label="Password"
                className="password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input.Password
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
