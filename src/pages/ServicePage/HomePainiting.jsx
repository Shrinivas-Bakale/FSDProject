import React, { useEffect, useState } from 'react'
import axios from 'axios'
import homePaintingBanner from '../../assets/homePainitingBanner.jpg'

const HomePainiting = () => {
    const [homePainting, setHomePainting] = useState([]);
    const [mainHeading, setMainHeading] = useState('');
    const fetchAndCategorizeData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5001/fsdproject-2f44c/us-central1/napi/api/example/getAllServices");
            const data = response.data;

            // Example 1: Group by category
            const groupedByCategory = data.reduce((acc, item) => {
                if (!acc[item.category]) {
                    acc[item.category] = [];
                }
                acc[item.category].push(item);
                return acc;
            }, {});

            console.log("Grouped by Category:", groupedByCategory);
            setHomePainting(groupedByCategory)
            // const { mainHeading, price, serviceHead } = diwaliLights[0] || {};

            // console.log("destructuring: ", mainHeading);

            // Example 2: Filter specific category
            // const acCleaningItems = data.filter((item) => item.category === "ac cleaning");
            // console.log("AC Cleaning Items:", acCleaningItems);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const specificCategory = homePainting["homePainting"];
    const specificObject = specificCategory ? specificCategory[0] : null; // Get the first object or null
    console.log(specificObject.mainHeading || null);

    useEffect(() => {
        fetchAndCategorizeData();
        setMainHeading(specificObject.mainHeading || null);
    }, []);


    return (
        <div className='bg-[#F0F0F3]'>
            <div className='container mx-auto '>
                <div className='grid grid-cols-1'>
                    <section className='py-16'>
                        <div className='grid grid-cols-2 gap-12'>
                            <div className='w-full '>
                                <img src={homePaintingBanner} className='object-cover h-full w-full rounded-lg' alt="" />
                            </div>
                            <div className='w-full h-full'>

                                <div className='flex flex-col '>
                                    <div className='flex items-center'>
                                        <h1 className="text-6xl font-semibold relative mr-4">
                                            {mainHeading || "Home Painting"}
                                        </h1>
                                    </div>

                                    <div className='w-full flex flex-col gap-3'>

                                        <div className="flex flex-col gap-6">
                                            {Object.keys(homePainting).length === 0 ? (
                                                <p>Loading services...</p>
                                            ) : (
                                                Object.entries(homePainting).map(([category, services]) => (
                                                    <div key={category}>
                                                        {/* <h2 className="text-4xl font-bold">{category}</h2> */}
                                                        {services.map((service) => (
                                                            <div
                                                                key={service.id}
                                                                className="flex gap-4 cursor-pointer"
                                                            >
                                                                <div className="w-3/4 flex flex-col mt-4">
                                                                    <h1 className="text-3xl">{service.serviceHead}</h1>
                                                                    <p className="text-xl">₹{service.price}/-</p>
                                                                    <p className="text-lg">{service.smallDescription}</p>
                                                                </div>
                                                                <div className="w-1/4 p-2">
                                                                    <div className="mr-4 mt-5 relative">
                                                                        <img
                                                                            src={service.pictureUrl || "https://via.placeholder.com/150"}
                                                                            className="w-full h-full rounded-xl"
                                                                            alt={service.serviceHead}
                                                                        />
                                                                        <button
                                                                            className="absolute -bottom-5 left-10 text-black rounded-xl flex justify-center items-center border-[1px] border-gray-300 bg-gray-200 mx-auto w-12 py-2 px-9"
                                                                        >
                                                                            Add
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))
                                            )}
                                        </div>







                                    </div>


                                </div>
                            </div>
                        </div>
                    </section>




                </div>
            </div>
        </div>
    )
}

export default HomePainiting
