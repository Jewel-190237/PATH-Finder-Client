import InvestoryNote from "./InvestoryNote";

const EarnRewards = () => {
  const cardData = [
    {
      title: "Premium App",
      description: "Buy premium apps from our platform and earn rewards on every purchase.",
      icon: "/src/assets/Rewards/bitcoin.png",
    },
    {
      title: "Premium Store",
      description: "Access our premium store for top-notch products. Every purchase brings exclusive rewards.",
      icon: "/src/assets/Rewards/security.png",
    },
    {
      title: "Dollar Exchange",
      description: "Convert currency securely and earn commissions on every transaction. The smarter way to save.",
      icon: "/src/assets/Rewards/shop.png",
    },
    {
      title: "Mobile Recharge",
      description: "Enjoy hassle-free phone recharges and earn rewards. Stay connected and earn big!",
      icon: "/src/assets/Rewards/slider.png",
    },
  ];

  return (
    <div className="bg-[url('/src/assets/Rewards/bg.png')] bg-cover bg-center py-10 text-white">
      <div className="max-w-[1320px] mx-auto">
        
        <h2 className="heading">
          Earn Rewards with Every Action!
        </h2>
        <p className="max-w-[650px] heading2 mb-10">
          From buying premium apps and shopping in our exclusive store to exchanging dollars securely and recharging your mobile, every action you take brings rewards.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-[#78120D] p-8 rounded-lg shadow-lg text-center hover:bg-red-800 transition duration-300"
            >
                <div className="bg-[rgba(35,7,19,0.30)] p-4 w-[72px] h-[72px] rounded-lg mx-auto mb-8 mt-4">
                <img
                src={card.icon}
                alt={card.title}
                
              />
                </div>
              
              <h3 className="heading2 mb-2">{card.title}</h3>
              <p className="heading4">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
       <InvestoryNote/>
    </div>
  );
};

export default EarnRewards
