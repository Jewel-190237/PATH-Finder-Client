

const teamMembers = [
    {
        name: "Charlie Septimus",
        role: "Motion Graphics Designer",
        img: "/src/assets/Team/1.png", // Replace with your image path
    },
    {
        name: "Jaylon Ekstrom",
        role: "Graphics Designer",
        img: "/src/assets/Team/2.png", // Replace with your image path
    },
    {
        name: "Justin Vaccaro",
        role: "Copywriter",
        img: "/src/assets/Team/3.png", // Replace with your image path
    },
    {
        name: "Jhon Smith",
        role: "Content Writer",
        img: "/src/assets/Team/4.png", // Replace with your image path
    },
    {
        name: "Jakob Rosser",
        role: "UI/UX Designer",
        img: "/src/assets/Team/1.png", // Replace with your image path
    },
    {
        name: "Emerson Arc",
        role: "Sound Designer",
        img: "/src/assets/Team/2.png", // Replace with your image path
    },
];

const TeamGrid = () => {
    return (
        <div className="bg-[url('/src/assets/Rewards/bg.png')] bg-cover bg-center py-10 text-white">
            <div className="max-w-[1320px] mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="heading xl:text-5xl max-w-[750px] mx-auto">Unmatched Quality and Convenience with Our Services!</h1>
                    <p className="heading2 max-w-[750px] mx-auto mt-6">
                        Unlock premium features, secure exchanges, and hassle-free recharges with our trusted services.
                    </p>
                </div>
                

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="relative bg-[#4b0404] rounded-lg shadow-lg overflow-hidden h-[535px] max-w-[400px] mx-auto">
                        {/* Image */}
                        <img
                          src={member.img} // Replace with your image path
                          alt={member.name}
                          className=" h-[400px] object-cover"
                        />
                  
                        {/* Info Section */}
                        <div className="bg-[#b10909] text-white px-6 h-[135px] py-8">
                          <h3 className="heading">{member.name}</h3>
                          <p className="heading2 text-[#D9D9D9] mt-3">{member.role}</p>
                        </div>
                  
                        {/* Action Buttons */}
                        <div className="absolute top-3 right-3 space-y-2">
                          <button className="bg-[#25d366] p-2 rounded-full">
                            <img
                              src="/icons/whatsapp.png" // Replace with a WhatsApp icon image
                              alt="WhatsApp"
                              className="w-5 h-5"
                            />
                          </button>
                          <button className="bg-[#0088cc] p-2 rounded-full">
                            <img
                              src="/icons/telegram.png" // Replace with a Telegram icon image
                              alt="Telegram"
                              className="w-5 h-5"
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamGrid;
