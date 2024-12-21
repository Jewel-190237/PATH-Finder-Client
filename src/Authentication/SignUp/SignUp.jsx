/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Form, Input } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import signup from "../../assets/signup.png";

const SignUp = () => {
  const navigate = useNavigate();
  const axiosSecurePublic = useAxiosPublic();
  const userRole = ["student", "subAdmin", "admin"];
  const [activeRole, setActiveRole] = useState("student");
  const [form] = Form.useForm();

  const returnLocation = useLocation();
  const from = returnLocation.state?.from?.pathname || "/";

  const onFinish = async (value) => {
    const newUser = {
      name: value.name,
      phone: value.phone,
      role: activeRole,
      password: value.password,
    };
    console.log("new User", newUser);
    try {
      const response = await axiosSecurePublic.post("/users", newUser);

      console.log(response);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Sign Up successful",
          showConfirmButton: true,
          text: "Please Login Now",
        });
        navigate("/login", { state: { from } });
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "warning",
          title: "User already exists",
          text: "Please login.",
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration failed",
          text: "Please try again later.",
        });
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
            Unlock 10% Off with Just a Few Clicks!
          </h2>
          <p className="mt-3 lg:mt-4 xl:mt-6 description text-center max-w-[480px] mx-auto">
            Fill out the form with your details and enjoy an exclusive 10%
            discount on your next purchase. It's quick, simple, and <br />{" "}
            rewarding!
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
                Sign In
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
