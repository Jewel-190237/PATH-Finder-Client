import React from 'react';

const PremiumServices = () => {
    return (
        <div
            className="bg-[url('/src/assets/service/premium.png')] bg-cover bg-center text-white py-10 px-5"
        >
            <div className="max-w-[1320px] mx-auto ">
                {/* Heading */}
                <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl  !font-roboto !font-bold mt-6 text-center max-w-[780px] mx-auto">
                    Premium <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#3F3FDE_0.07%,#FF0DEF_32.88%)]">Services</span>, Currency Exchange,  and Phone Recharges!
                </h1>

                {/* Short Description */}
                <p className="heading2 mb-10 mt-6 max-w-[780px] mx-auto text-center">
                    Effortlessly by referring users. Start earning effortlessly by referring users into rewards today!
                </p>

                {/* Image */}
                <div className="rounded-xl overflow-hidden mb-8">
                    <img
                        src="/src/assets/service/photo.png"
                        alt="Students reading"
                        className="w-full h-auto"
                    />
                </div>

                {/* Long Description */}
                <p className="text-sm md:text-base leading-relaxed font-roboto">
                    Lorem ipsum dolor sit amet consectetur. Mus consequat ut accumsan sit amet proin. Arcu nec eget non diam elementum
                    morbi. Purus vitae donec aliquet nam leo massa elementum semper. Faucibus tortor et sed accumsan semper. Lorem ipsum
                    dolor sit amet consectetur. Mus consequat ut accumsan sit amet proin. Arcu nec eget non diam elementum morbi. Purus vitae
                    donec aliquet nam leo massa elementum semper. Faucibus tortor et sed accumsan semper.
                </p>
            </div>
        </div>
    );
};

export default PremiumServices;
