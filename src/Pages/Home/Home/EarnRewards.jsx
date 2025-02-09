import InvestoryNote from "./InvestoryNote";
import bitcoin from "../../../assets/Rewards/bitcoin.png"
import security from "../../../assets/Rewards/security.png"
import shop from "../../../assets/Rewards/shop.png"
import slider from "../../../assets/Rewards/slider.png"
const EarnRewards = () => {
  const cardData = [
    {
      title: "Premium App",
      description: "Buy premium apps from our platform and earn rewards on every purchase.",
      icon: bitcoin,
    },
    {
      title: "Premium Services",
      description: "Access our premium store for top-notch products. Every purchase brings exclusive rewards.",
      icon: security,
    },
    {
      title: "Dollar Exchange",
      description: "Convert currency securely and earn commissions on every transaction. The smarter way to save.",
      icon: shop,
    },
    {
      title: "Mobile Recharge",
      description: "Enjoy hassle-free phone recharges and earn rewards. Stay connected and earn big!",
      icon: slider,
    },
  ];

  return (
    <div className="bg-[url('/src/assets/Rewards/bg.png')] bg-cover bg-center py-10 text-white">
      <div className="path-container">
        <h2 className="heading">
          Earn Rewards with Every Action!
        </h2>
        <p className="max-w-[650px] heading2 mb-10">
          From buying premium apps and shopping in our exclusive store to exchanging dollars securely and recharging your mobile, every action you take brings rewards.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-[#78120D] p-1 md:p-4 lg:p-6 xl:p-8 rounded-lg shadow-lg text-center hover:bg-red-800 transition duration-300"
            >
              <div className="bg-[rgba(35,7,19,0.30)] lg:p-4 md:p-2 p-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-[72px] lg:h-[72px] rounded-lg mx-auto mb-3 sm:mb-4 md:mb-6 lg:mb-7 xl:mb-8 mt-4">
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
      <InvestoryNote />
    </div>
  );
};

export default EarnRewards
