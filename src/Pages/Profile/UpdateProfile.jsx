import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
    setFormData({ ...formData });
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const [formData, setFormData] = useState({
    name: "Ashiqur Rahman",
    contactNumber: "+880 154645 1456",
    telegramLink: "https://t.me/uxaminul",
    facebookLink: "https://t.me/uxaminul",
    fatherContactNumber: "+880 15465 5465",
    motherContactNumber: "+880 15465 5465",
  });

  const handleSave = () => {
    alert("Details saved! This setting is permanent.");
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat w-full relative -mt-2 pt-20"
      style={{ backgroundImage: `url('/src/assets/profile/Rank.png')` }}
    >
      <div className="flex justify-center mb-6">
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </div>

      <form className="space-y-4 bg-[#78120D1A] mx-auto rounded-xl pb-10">
        <h2 className="heading2 pt-10 pb-6  pl-10 text-white">
          Edit your Details
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-between px-10 ">
          <div className="w-full bg-[rgba(246,23,12,0.10)] p-5 rounded-lg space-y-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-white">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded bg-[#78120D] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Contact Number
              </label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded bg-[#78120D] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Telegram ID link / Number
              </label>
              <input
                type="text"
                name="telegramLink"
                value={formData.telegramLink}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded bg-[#78120D] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Facebook ID link
              </label>
              <input
                type="text"
                name="facebookLink"
                value={formData.facebookLink}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded bg-[#78120D] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                {"Father's Contact Number"}
              </label>
              <input
                type="text"
                name="fatherContactNumber"
                value={formData.fatherContactNumber}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded bg-[#78120D] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                {"Mother's Contact Number"}
              </label>
              <input
                type="text"
                name="motherContactNumber"
                value={formData.motherContactNumber}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded bg-[#78120D] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
          <div className="w-full bg-[rgba(246,23,12,0.10)] p-5 rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-medium text-white">
                Address 1
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded bg-[#78120D] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Address 1
              </label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded bg-[#78120D] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Sub-District
              </label>
              <input
                type="text"
                name="telegramLink"
                value={formData.telegramLink}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded bg-[#78120D] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                District
              </label>
              <input
                type="text"
                name="facebookLink"
                value={formData.facebookLink}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded bg-[#78120D] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                {"Zip Code"}
              </label>
              <input
                type="text"
                name="fatherContactNumber"
                value={formData.fatherContactNumber}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded bg-[#78120D] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                CountrCountry
              </label>
              <input
                type="text"
                name="motherContactNumber"
                value={formData.motherContactNumber}
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded bg-[#78120D] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
         
          <button
            type="button"
            onClick={handleSave}
            className="mt-4 px-4 py-2 lg:px-6 lg:py-3 bg-blue-600 hover:bg-blue-700 text-[12px] lg:text-[14px] xl:text-[16px] text-white font-bold rounded mr-10"
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
