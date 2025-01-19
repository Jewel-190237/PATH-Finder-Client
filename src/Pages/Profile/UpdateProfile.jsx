import { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import axios from "axios";
import GetUser from "../../Backend/GetUser";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG files!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsappLink: "",
    telegramLink: "",
    facebookLink: "",
    fatherContactNumber: "",
    motherContactNumber: "",
    address: "",
    subDistrict: "",
    district: "",
    zipCode: "",
    country: "",
    imageUrl: "image.jpg",
  });

  const user = GetUser();
  const [currentUser, setCurrentUser] = useState(null)

  console.log("dcjcd dvjkfvjnf ", currentUser)
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      setFormData({
        ...formData,
        ...user,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (file) => {
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
    uploadData.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);

    try {
      setLoading(true);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
        uploadData
      );
      setFormData((prev) => ({ ...prev, imageUrl: res.data.secure_url }));
      setLoading(false);
      message.success("Image uploaded successfully!");
    } catch (err) {
      setLoading(false);
      message.error("Failed to upload image!");
    }
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      handleImageUpload(info.file.originFileObj);
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/users/${user?._id}`,
        formData
      );
      if (res.status === 200) {
        message.success("Profile updated successfully!");
      }
    } catch (err) {
      message.error("Failed to update profile!");
    }
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat w-full relative -mt-2 pt-40"
      style={{ backgroundImage: "url('/src/assets/profile/Rank.png')" }}
    >
      <div className="max-w-5xl mx-auto rounded-lg shadow-lg">
        <div className="relative -mt-16 flex justify-center mb-20">
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {formData.imageUrl ? (
              <img
                src={formData.imageUrl}
                alt="avatar"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
              </div>
            )}
          </Upload>
        </div>
        <div className="p-8 bg-[#78120D1A]">
          <h2 className="text-xl font-semibold text-white ">
            Edit Your Details
          </h2>
          <form className="space-y-4  mx-auto rounded-xl pb-10">
            <div className="flex flex-col md:flex-row">
              <div className="w-full flex flex-col bg-[#F6170C1A] p-6 rounded-md space-y-4">
                {/* Left Fields */}
                {[
                  { label: "Name", name: "name", placeholder: "Name" },
                  { label: "Contact Number", name: "phone", placeholder: "phone" },
                  { label: "Telegram Link", name: "telegramLink", placeholder: "telegramLink" },
                  { label: "Facebook Link", name: "facebookLink", placeholder: "Facebook link" },
                  { label: "Father's Contact", name: "fatherContactNumber", placeholder: "Father Contact" },
                  { label: "Mother's Contact", name: "motherContactNumber", placeholder: "Mother Contact" },
                ].map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-white">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name]}
                      placeholder={field.placeholder}
                      onChange={handleInputChange}
                      className="w-full p-4 mt-1  bg-[#78120D] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                ))}
              </div>
              <div className="w-full flex flex-col bg-[#F6170C1A] p-6 rounded-md space-y-4">
                {/* Right Fields */}
                {[
                  { label: "Whatsapp Link", name: "whatsappLink", placeholder: "whatsappLink" },
                  { label: "Address", name: "address", placeholder: "Address" },
                  { label: "Sub-District", name: "subDistrict", placeholder: "Sub District" },
                  { label: "District", name: "district", placeholder: "District" },
                  { label: "Zip Code", name: "zipCode", placeholder: "Zip code" },
                  { label: "Country", name: "country", placeholder: "country" },
                ].map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-white">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="w-full p-4 mt-1 rounded-md  bg-[#78120D] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-10 text-xl">
              <div className="max-w-[460px]">
               <p className="text-white"> This setting is permanent and cannot be changed again once saved.</p>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
