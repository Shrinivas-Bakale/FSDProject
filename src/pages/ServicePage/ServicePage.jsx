import React from 'react'
import service from '../../assets/login-bg.jpg'

const ServicePage = () => {
    return (
        <div className='bg-[#F0F0F3]'>
            <div className='container mx-auto '>
                <div className='grid grid-cols-1'>
                    <div>
                        <section className='px-72 py-16  flex justify-center items-center'>
                            <div
                                className=' h-3/4  rounded-3xl product-page-shadow flex  items-center p-5 gap-4' >
                                <div className='w-1/2 h-[95%] rounded-3xl'>
                                    <img src={service} alt="" className='object-cover h-full rounded-3xl' />
                                </div>

                                <div className='flex flex-col justify-between items-start h-full w-1/2'>
                                    <div>

                                        <div className='mt-2'>
                                            <h1 className='text-4xl font-semibold'>
                                                Service Name with anything
                                            </h1>
                                        </div>
                                        <p className='text-md mt-2'>
                                            Air conditioner service ensures your cooling system operates efficiently, providing regular maintenance like cleaning filters, checking refrigerant levels, and inspecting electrical components. It prevents breakdowns, improves air quality, and extends the unit's lifespan. Professional technicians ensure optimal performance, keeping your home cool and comfortable, especially during hot weather.
                                        </p>
                                    </div>
                                    <div className='w-full mt-2 flex justify-end items-center gap-4'>

                                        <p className='text-xls font-semibold mr-3'>
                                            ₹199/-
                                        </p>

                                        <button className='p-2 bg-black text-white text-[18px] whitespace-nowrap  transition-all duration-300 hover:scale-105 font-semibold rounded-xl'>
                                            Book Now
                                        </button>
                                        <button className='p-2 bg-transparent border-[1px] text-[18px] whitespace-nowrap transition-all duration-300 hover:scale-105 border-gray-700 text-black font-semibold rounded-xl'>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>


                            </div>


                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicePage
