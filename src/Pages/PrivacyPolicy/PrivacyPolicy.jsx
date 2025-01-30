import { Button } from "antd";
import { useEffect } from "react";


const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | Course Details";
  }, []);

  return (
    <div className="  bg-[#20010D]">
      <div className="pt-20 pb-40 mx-auto  max-w-[1320px] text-white shadow-md rounded-2xl">
        <h1 className="text-3xl font-bold  mb-6">Privacy Policy</h1>
        <p className="text-white mb-4">
          Welcome to our Privacy Policy page. We value your trust and are committed to protecting your privacy.
        </p>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3 text-white">Information We Collect</h2>
          <ul className="list-disc list-inside text-white">
            <li>Personal information (e.g., name, email) when you register for a course.</li>
            <li>Course preferences and feedback to improve our offerings.</li>
            <li>Browser data to enhance user experience on our platform.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3 text-white">How We Use Your Information</h2>
          <ul className="list-disc list-inside text-white">
            <li>To provide course-related services and materials.</li>
            <li>To improve our platform and user experience.</li>
            <li>To communicate with you regarding updates or offers.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3 ">Data Protection</h2>
          <p className="text-white">
            We implement strict security measures to protect your data from unauthorized access.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3 ">Third-Party Services</h2>
          <p className="text-white">
            We do not share your personal information with third-party services unless required by law.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3 ">Your Rights</h2>
          <p className="text-white">
            You have the right to access, update, or delete your personal information by contacting our support team.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3 ">Changes to This Policy</h2>
          <p className="text-white">
            We may update this Privacy Policy from time to time. Please check this page periodically for updates.
          </p>
        </section>

        <div className="mt-8">
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
            Accept and Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
