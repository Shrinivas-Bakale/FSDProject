import React from 'react'
import fossil from "../assets/Fossil Men's Neutra Chronograph Brown Leather Strap Watch 44mm - Macy's.jpg"
import { NavLink } from 'react-router-dom'
import PaymentSummary from './PaymentSummary'
import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
    return (
        <div className=''>
            <div className='container mx-auto '>
                <div className='grid grid-cols-1'>

                    <div className='flex items-center justify-start gap-5 px-52 py-5 border-b-2 border-gray-200 mx-8'>
                        <FaShoppingCart className='text-4xl' />
                        <h1 className='text-3xl'>Your Cart</h1>
                    </div>

                    <div className='flex px-52 py-5  justify-between mx-auto w-full '>

                        <section className='w-[50%]'>
                            <div>
                                <div className='flex justify-between items-center gap-5 border-b-2 border-gray-200 p-4'>
                                    <div>
                                        <img src={fossil} alt="" className='w-20 drop-shadow-lg' />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <h1 className='text-3xl '>
                                            MEN's Green Titanium Watch
                                        </h1>
                                        <div>
                                            <p className='text-lg'>1 Service • ₹298 </p>
                                        </div>
                                        <div className="flex justify-center items-center w-full h-full">
                                            <NavLink
                                                to="/checkout"
                                                className="bg-black text-white p-2 rounded-md w-full text-center"
                                            >
                                                Checkout
                                            </NavLink>
                                        </div>

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

export default Cart
