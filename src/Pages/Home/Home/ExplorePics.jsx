

// // const ExplorePics = () => {
// //     return (
// //         <div>

import { MdOutlineMan } from "react-icons/md";

// //         </div>
// //     );
// // };

// // export default ExplorePics;

// const ExplorePics = () => {
//     const teamMembers = [
//         {
//             id: 1,
//             image: '/src/assets/explorePics/1.png',
//             name: 'John Doe',
//             rating: '⭐⭐⭐⭐',
//             designation: 'Software Engineer',
//         },
//         {
//             id: 2,
//             image: '/src/assets/explorePics/2.png',
//             name: 'Jane Smith',
//             rating: '⭐⭐⭐⭐⭐',
//             designation: 'Project Manager',
//         },
//         {
//             id: 3,
//             image: '/src/assets/explorePics/3.png',
//             name: 'Sam Wilson',
//             rating: '⭐⭐⭐⭐',
//             designation: 'UI/UX Designer',
//         },
//     ];

//     return (
//         <div
//             className="w-full min-h-screen bg-cover bg-center flex flex-col justify-center px-6 -mt-20"
//             style={{
//                 backgroundImage: 'url("/src/assets/explorePics/bg.png")',
//             }}
//         >
//             <div className="max-w-[1320px] mx-auto">
//             <h1 className="heading text-left">Hear from Our Happy Clients</h1>
//             <p className="description mt-2 md:mt-3 lg:mt-4">
//                 Trusted by hundreds, loved by all—here’s{" "}
//                 <br className="hidden md:block" /> what they have to share.
//             </p>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1320px] mx-auto">
//                 {teamMembers.map((member) => (
//                     <div
//                         key={member.id}
//                         className=" rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
//                     >
//                         <img
//                             src={member.image}
//                             alt={member.name}
//                             className="w-full h-48 object-cover"
//                         />
//                         <div className="p-4 text-center bg-[rgba(176, 176, 176, 1)]">
//                             <h2 className="text-lg font-bold text-gray-800">{member.name}</h2>
//                             <p className="text-yellow-500">{member.rating}</p>
//                             <p className="text-sm text-gray-600">{member.designation}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             </div>
//         </div>
//     );
// };

// export default ExplorePics;


const ExplorePics = () => {
    const teamMembers = [
        {
            id: 1,
            image: '/src/assets/explorePics/1.png',
            enroled: "1672 enrolled",
            dolar: "20 $",
            name: 'Canva design',
            rating: '4.9 ⭐',

        },
        {
            id: 2,
            image: '/src/assets/explorePics/2.png',
            enroled: "1672 enrolled",
            dolar: "20 $",
            name: 'Canva design',
            rating: '4.9 ⭐',
        },
        {
            id: 3,
            image: '/src/assets/explorePics/3.png',
            enroled: "1672 enrolled",
            dolar: "20 $",
            name: 'Canva design',
            rating: '4.9 ⭐',
        },
    ];

    return (
        <div
            className="bg-cover bg-center relative text-white -mt-20"
            style={{
                backgroundImage: 'url("/src/assets/explorePics/bg.png")',
            }}
        >
            <div className="max-w-[1320px] mx-auto py-14 md:py-20 lg:py-[100px] xl:py-[120px]">
                <h1 className="text-4xl font-bold text-left">Explore Our Top Picks Just<br /> for You!</h1>
                <p className="text-lg mt-2 md:mt-3 lg:mt-4 text-left">
                Trusted by hundreds, loved by all—here’s {" "}
                    <br className="hidden md:block" /> what they have to share.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {teamMembers.map((member) => (
                        <div
                            key={member.id}
                            className="rounded-3xl  overflow-hidden w-full transform transition-transform hover:scale-105 shadow-[0px_4px_10px_0px_rgba(220,220,220,0.20)]"
                        >

                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 text-center bg-[#20010D]">
                                <div className="flex justify-between">
                                    <h2 className="text-lg font-bold text-white">{member.name}</h2>
                                    <p className="text-lg font-bold text-white">{member.dolar}</p>
                                </div>

                                <div className="flex mt-4 justify-between">
                                    <p className="text-sm flex text-[#B0B0B0]"><span className="text-xl"><MdOutlineMan /></span> {member.enroled}</p>
                                    <p className="text-yellow-500">{member.rating}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExplorePics;

