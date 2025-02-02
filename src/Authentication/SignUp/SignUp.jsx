/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import signup from "../../assets/signup.png";

const SignUp = () => {
  const navigate = useNavigate();
  const axiosSecurePublic = useAxiosPublic();
  const userRole = ["student", "subAdmin"];
  const [activeRole, setActiveRole] = useState("student");
  const [form] = Form.useForm();
  const returnLocation = useLocation();
  const from = returnLocation.state?.from?.pathname || "/";

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };
  const [param] = useSearchParams();
  const referenceCode = param?.get("reference");
  console.log("🚀 ~ SignUp ~ referenceCode:", referenceCode)

  const onFinish = async (value) => {
    try {
      const fetchedUsers = await fetchUsers();
      const matchingUser = fetchedUsers.find(
        (user) => user.code === referenceCode
      );

      const newUser = {
        name: value.name,
        phone: value.phone,
        role: activeRole,
        password: value.password,
        subAdmin: matchingUser ? matchingUser._id : null,
      };

      console.log("New User:", newUser);
      const response = await axiosSecurePublic.post("/users", newUser);

      if (response.status === 200) {
        message.success("User created successfully");
        navigate("/login", { state: { from } });
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        message.error("User already exists");
      } else {
        message.error("Something went wrong");
      }
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
          Join Our Learning Revolution
          </h2>
          <p className="mt-3 lg:mt-4 xl:mt-6 description text-center max-w-[480px] mx-auto">
          Unlock your full potential with our comprehensive courses designed to elevate your skills. Sign up today and take the first step toward success
          </p>
          <div className="flex items-center justify-center mt-4 md:mt-5 lg:mt-6 xl:mt-8 gap-2 md:gap-3 lg:gap-4 xl:gap-6">
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
                Sign Up
              </button>
            </Form>
            <p className="my-4 text-center">
              Have an account?{" "}
              <Link to="/login" className="underline text-primary font-bold">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
