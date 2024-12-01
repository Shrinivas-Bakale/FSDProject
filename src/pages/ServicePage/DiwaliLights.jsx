import React, { useEffect, useState } from 'react'
import axios from 'axios'
import lightsBanner from '../../assets/lightsBanner.jpg'

const DiwaliLights = () => {
    const [diwaliLights, setDiwaliLights] = useState()
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
            setDiwaliLights(groupedByCategory)
            const { mainHeading, price, serviceHead } = diwaliLights[0] || {};

            console.log("destructuring: ", mainHeading);

            // Example 2: Filter specific category
            const acCleaningItems = data.filter((item) => item.category === "ac cleaning");
            console.log("AC Cleaning Items:", acCleaningItems);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchAndCategorizeData();
    }, []);

    return (
        <div className='bg-[#F0F0F3]'>
            <div className='container mx-auto '>
                <div className='grid grid-cols-1'>
                    <section className='py-16'>
                        <div className='grid grid-cols-2 gap-12'>
                            <div className='w-full '>
                                <img src={lightsBanner} className='object-cover h-full w-full rounded-lg' alt="" />
                            </div>
                            <div className='w-full h-full'>

                                <div className='flex flex-col '>
                                    <div className='flex items-center'>
                                        <h1 className="text-6xl font-semibold relative mr-4">
                                            AC Repair & <br /> Service
                                        </h1>
                                    </div>

                                    <div className='w-full flex flex-col gap-3'>

                                        <div className='flex gap-4 cursor-pointer'
                                            // onClick={() => {
                                            //     setserviceModal(true);
                                            // }}

                                        >
                                            <div className='w-3/4 flex flex-col mt-4'>
                                                <h1 className='text-3xl'>
                                                    Power Saver AC Service
                                                </h1>
                                                <p className='text-xl'>
                                                    ₹199/-
                                                </p>
                                                <p className='text-lg'>
                                                    Thorough cleaning of indoor unit with foam-jet spray
                                                </p>
                                            </div>

                                            <div className='w-1/4 p-2 '>
                                                <div className='mr-4 mt-5 relative'>
                                                    <img src="" className='w-full h-full rounded-xl' alt="" />
                                                    <button className='absolute  -bottom-5  left-10 text-black  rounded-xl flex justify-center items-center border-[1px] border-gray-300 bg-gray-200 mx-auto w-12 py-2 px-9'>
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
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

export default DiwaliLights
