const ContactPage = () => {
  return (
    <div className="bg-[#20010D] text-white pt-20 pb-40 px-6">
      <div className="max-w-[1320px] mx-auto text-white">
        <h1 className="text-3xl font-bold mb-6">Contact Information</h1>
        <p className="mb-4">
          Thank you for visiting our contact page. Here you will find all the details needed to reach out to us.
        </p>
        
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Office Address</h2>
          <p className="text-white">123 Tech Street, Innovation City, CA 94000</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Email Address</h2>
          <p className="text-white">support@techcourses.com</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Phone Number</h2>
          <p className="text-white">+1 234-567-8900</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Business Hours</h2>
          <p className="text-white">Monday to Friday: 9:00 AM to 5:00 PM</p>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;