import React, { useEffect, useRef, useState } from 'react';
import fossil from "../assets/Fossil Men's Neutra Chronograph Brown Leather Strap Watch 44mm - Macy's.jpg";
import { NavLink } from 'react-router-dom';
import PaymentSummary from './PaymentSummary';
import { FaShoppingCart } from "react-icons/fa";
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from './firebase/firebase';

const Cart = () => {
    // Initialize cartItems as an empty array
    const [cartItems, setCartItems] = useState([]);
    const auth = getAuth(firebaseApp);
    const uId = auth.currentUser?.uid; // Get the logged-in user's UID
    const [serviceModal, setserviceModal] = useState(false);
    const serviceModalRef = useRef(null);
    const [singleService, setSingleService] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);  // State to store total price


    const getCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/fsdproject-2f44c/us-central1/napi/api/cart/getCartItems/${uId}`);

            setCartItems(response.data || []);  // Ensure cartItems is an array
            calculateTotal(response.data || []);
        } catch (error) {
            console.error('Error fetching cart items:', error);
            setCartItems([]); // Set empty array if there is an error
        }
    };

    
    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) => sum + (parseFloat(item.price) ), 0);
        setTotalPrice(total);
    };
    useEffect(() => {
        if (uId) {
            getCartItems();
        }
    }, []);

    const handleClickOutside = (event) => {
        if (serviceModalRef.current && !serviceModalRef.current.contains(event.target)) {
            setserviceModal(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const getServiceById = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5001/fsdproject-2f44c/us-central1/napi/api/example/getServiceById/${id}`);
            const data = response.data;

            setSingleService(data);
            console.log(singleService);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className=''>
            <div className='container mx-auto'>
                <div className='grid grid-cols-1'>
                    <div className='flex items-center justify-start gap-5 px-52 py-5 border-b-2 border-gray-200 mx-8'>
                        <FaShoppingCart className='text-4xl' />
                        <h1 className='text-3xl'>Your Cart</h1>
                    </div>

                    <div className='flex px-52 py-5 justify-between mx-auto w-full'>

                        <section className='w-[50%]'>
                            <div>
                                {/* Map over cartItems only if it's an array */}
                                {cartItems.length > 0 ? (
                                    cartItems.map((item) => (
                                        <div key={item.id} className='flex justify-between items-center gap-5 border-b-2 border-gray-200 p-4 cursor-pointer' onClick={() => { getServiceById(item.id); setserviceModal(true); }}>
                                            <div>
                                                {/* Display item image */}
                                                <img src={item.pictureUrl || fossil} alt={item.serviceHead} className='w-3/4 drop-shadow-lg' />
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <h1 className='text-3xl'>{item.serviceHead}</h1>
                                                <div>
                                                    {/* Display quantity and price */}
                                                    <p className='text-lg'> Service • ₹{item.price}</p>
                                                </div>
                                                <div className="flex justify-center items-center w-full h-full">
                                                    {/* Checkout link for the specific item */}
                                                    <NavLink
                                                        to={`/checkout`}
                                                        className="bg-black text-white p-2 rounded-md w-full text-center"
                                                    >
                                                        Checkout
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Your cart is empty</p>
                                )}
                            </div>
                        </section>

                        <div className='w-[40%]'>
                            <PaymentSummary totalPrice={totalPrice} />
                        </div>
                    </div>
                </div>
            </div>
            {
                serviceModal && (

                    <div className='fixed top-0 left-0 w-full h-full z-50 bg-gray-800 bg-opacity-50 gap-4 flex justify-center items-center'>
                        <section className='px-72 py-16 flex justify-center items-center aos-home'>
                            {singleService ? (
                                <div className='w-3/4 rounded-3xl flex  items-center p-5 gap-4 bg-white' ref={serviceModalRef}>
                                    <div className='w-1/2 rounded-3xl'>
                                        <img
                                            src={singleService.pictureUrl || "https://via.placeholder.com/150"}
                                            alt={singleService.serviceHead || "Service Image"}
                                            className='object-cover h-full rounded-3xl'
                                        />
                                    </div>

                                    <div className='flex flex-col justify-between items-start h-full w-1/2'>
                                        <div>
                                            <div className='mt-2'>
                                                <h1 className='text-4xl font-semibold'>
                                                    {singleService.serviceHead || "Service Name"}
                                                </h1>
                                            </div>
                                            <p className='text-md mt-2'>
                                                {singleService.elaboratedDescription || "Description not available."}
                                            </p>
                                        </div>
                                        <div className='w-full mt-2 flex justify-between items-center gap-4'>
                                            <p className='text-lg font-semibold mr-3'>
                                                <span>₹</span>{singleService.price || "N/A"} <span>/-</span>
                                            </p>
                                            <button
                                                className='p-2 bg-transparent border-[1px] text-[18px] whitespace-nowrap transition-all duration-300 hover:scale-105 border-gray-700 text-black font-semibold rounded-xl'
                                                onClick={() => handleAddToCart(singleService.id)}
                                            >
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p>Loading service details...</p>
                            )}
                        </section>
                    </div>

                )
            }
        </div>
    );
};

export default Cart;
