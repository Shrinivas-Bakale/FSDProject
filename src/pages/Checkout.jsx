import React from 'react'
import { MdShoppingCartCheckout } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import PaymentSummary from './PaymentSummary';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

const Checkout = () => {
    const address = "123 Maplewood Avenue, Apt 4B Springfield, IL 62704 United States";
    const truncateWords = (text, limit) => {
        const words = text.split(' ');
        return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
    };

    const truncatedAddress = truncateWords(address, 6);
    return (
        <div className=''>
            <div className='container mx-auto '>
                <div className='grid grid-cols-1'>
                    <div className='flex items-center justify-start gap-5 px-52 py-5 border-b-2 border-gray-200 mx-8'>
                        <MdShoppingCartCheckout className='text-4xl' />
                        <h1 className='text-3xl'>Checkout</h1>
                    </div>
                    <div className='flex px-52 py-5  justify-between mx-auto w-full '>

                        <section className='w-[50%] border-2 border-gray-300 p-4 rounded-lg'>
                            <div className='w-full flex-grow flex-col'>
                                <div className='flex gap-4 items-center border-b-2 border-gray-300 py-2'>
                                    <div className='p-2 bg-slate-300 rounded-md'>
                                        <FaLocationDot className='text-3xl' />
                                    </div>
                                    <div className='flex flex-col gap-1 justify-center'>
                                        <h3 className='text-xl font-semibold'>
                                            Send booking details to
                                        </h3>
                                        <p className='text-lg text-slate-500'>
                                            +91 696969696
                                        </p>
                                    </div>
                                </div>
                                <div className='flex gap-4 items-center border-b-2 border-gray-300 py-2'>
                                    <div className='p-2 bg-slate-300 rounded-md'>
                                        <FaLocationDot className='text-3xl' />
                                    </div>
                                    <div className='flex flex-col  justify-center'>
                                        <h3 className='text-xl font-semibold'>
                                            Address
                                        </h3>
                                        <p className='text-lg text-slate-500'>
                                            {truncatedAddress}
                                        </p>
                                    </div>
                                    <div>
                                        
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className='w-[40%]'>
                            <PaymentSummary />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
