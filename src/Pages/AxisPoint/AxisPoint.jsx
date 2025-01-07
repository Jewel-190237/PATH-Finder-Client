
const AxisPoint = () => {
    const sampleData = [
        { id: 1, name: "Omar Saris", amount: "35469 $" },
        { id: 2, name: "Omar Saris", amount: "35469 $" },
        { id: 3, name: "Omar Saris", amount: "35469 $" },
        { id: 4, name: "Marley Septimus", amount: "35469 $" },
        { id: 5, name: "Talan Donin", amount: "35469 $" },
        { id: 6, name: "Cheyenne Kenter", amount: "35469 $" },
        { id: 7, name: "Tiana Baptista", amount: "35469 $" },
        { id: 8, name: "Talan Donin", amount: "35469 $" },
        { id: 9, name: "Cheyenne Kenter", amount: "35469 $" },
        { id: 10, name: "Tiana Baptista", amount: "35469 $" },
    ];
    return (
        <div className="bg-[url('/src/assets/service/premium.png')] bg-cover bg-center text-white py-10 px-5">
            <div className="max-w-[1320px] mx-auto">
                <div className="text-center text-white">
                    <h1 className="heading font-bold mb-4">
                        Your Gateway to Exclusive Benefits!
                    </h1>
                    <p className="text-sm md:text-lg text-gray-300 mx-auto max-w-[630px]">
                        Create and customize your profile to unlock personalized offers, track
                        your activities, and enjoy seamless access to all our services.access to all our services.
                    </p>
                </div>
                <div className="p-6 mt-20 -mb-28 border-[1px] border-[#F5F8FC] rounded-t-[60px]">
                    <div className="p-12  rounded-t-[40px]  shadow-lg mx-auto border-[1px] border-[#F5F8FC]" style={{ background: 'rgba(246, 23, 12, 0.2)' }} >
                        {sampleData?.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center bg-[rgba(255,255,255,0.20)]  p-3 mb-3 rounded-lg shadow-inner"
                            >
                                <div className="flex  items-center">
                                    <p className="text-white font-bold  w-8 flex items-center justify-center mr-4 border-r-4 border-white ">
                                        {item.id} <span className="border-r-4 border-white "></span>
                                    </p>
                                    <p className="text-white font-medium">{item.name}</p>
                                </div>
                                <p className="text-white font-semibold">{item.amount}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AxisPoint;



