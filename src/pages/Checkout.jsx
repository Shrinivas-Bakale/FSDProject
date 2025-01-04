import React, { useEffect, useRef, useState } from 'react'
import { MdShoppingCartCheckout } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import PaymentSummary from './PaymentSummary';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from './firebase/firebase';
import "react-datepicker/dist/react-datepicker.css";
import { RiSecurePaymentFill } from "react-icons/ri";
import { IoTime } from "react-icons/io5";
import toast from 'react-hot-toast';

const Checkout = () => {
    // const address = "123 Maplewood Avenue, Apt 4B Springfield, IL 62704 United States";
    const truncateWords = (text, limit) => {
        const words = text.split(' ');
        return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
    };

    const auth = getAuth(firebaseApp);
    const uId = auth.currentUser?.uid;
    const location = useLocation();
    const { totalPrice } = location.state || { totalPrice: 0 };
    const navigate = useNavigate();

    const [addressModal, setAddressModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [address, setAddress] = useState("Loading address...");
    const [editedAddress, setEditedAddress] = useState(() => {
        // Retrieve the edited address from localStorage if available
        const savedAddress = localStorage.getItem('editedAddress');
        return savedAddress ? JSON.parse(savedAddress) : "Loading address...";
    });
    const [userDocument, setUserDocument] = useState(() => {
        // Load address from localStorage
        const savedAddress = localStorage.getItem('userAddress');
        return savedAddress ? JSON.parse(savedAddress) : null;
    });
    const [timeSlot, setTimeSlot] = useState(null);

    const addressModalRef = useRef(null);

    const handleDateChange = (date) => {
        setTimeSlot((prev) => ({
            ...prev,
            date: date,
        }));
    };

    const handleTimeChange = (time) => {
        setTimeSlot((prev) => ({
            ...prev,
            time: time,
        }));
    };

    console.log(timeSlot);

    const userDoc = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5001/fsdproject-2f44c/us-central1/napi/api/users/getUserById/${uId}`);
            const userData = response.data;
            setUserDocument(userData); // Update state
            localStorage.setItem('userAddress', JSON.stringify(userData)); // Save to localStorage
            setEditedAddress(userData.address);
            localStorage.setItem('editedAddress', JSON.stringify(userData.address));
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    const handleClickOutside = (event) => {
        if (addressModalRef.current && !addressModalRef.current.contains(event.target)) {
            setAddressModal(false);
        }
    };

    useEffect(() => {
        if (uId) {
            userDoc(); // Fetch user data on mount
        }
    }, [uId]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handlePayment = async (amount) => {
        const amountInPaise = amount;
        console.log(amountInPaise);

        try {
            // Step 1: Create an order in the backend
            const { data: order } = await axios.post(
                "http://127.0.0.1:5001/fsdproject-2f44c/us-central1/napi/api/orders/order", // Replace with your backend API URL
                {
                    amount: amountInPaise, // Amount in paise (₹50)
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            // Step 2: Configure Razorpay options
            const options = {
                key: "rzp_test_1txnm5ZM9iktJs",
                amount: order.amount, // Amount in paise
                currency: order.currency,
                name: "Nexesential",
                description: "Ordering a service",
                order_id: order.id, // Order ID from backend
                handler: async function (response2) {
                    // Step 3: Handle successful payment
                    toast.success(`Payment successful! Payment ID: ${response2.razorpay_payment_id}`);
                    console.log(response2)

                    try {
                        const orderDetails = {
                            amount: totalPrice,
                            address: editedAddress,
                            timeSlot: timeSlot,
                            uid: uId,
                            receiptId: response2.razorpay_payment_id
                        }
                        console.log(orderDetails);
                        // Send the orderDetails as request body to your backend API
                        const response = await axios.post(
                            'http://127.0.0.1:5001/fsdproject-2f44c/us-central1/napi/api/orders/create', // Example API endpoint
                            orderDetails,
                        );
                        console.log('Order submitted:', response.data);
                        setTimeout(() => {
                            navigate('/orders');
                        }, 700)
                    } catch (error) {
                        console.error('Error submitting order:', error);
                    }

                    // Optionally, verify payment on the backend
                    // axios.post("http://127.0.0.1:5001/fsdproject-2f44c/us-central1/napi/api/orders/order", response)
                    //     .then(() => toast.success("Payment verified successfully!"))
                    //     .catch(err => toast.error("Payment verification failed:", err));
                },
            };

            // Step 4: Open Razorpay payment popup
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            toast.error("Error initiating Razorpay payment:", error);
            toast.error(`Error initiating Razorpay payment: ${error.message}`);
        }
    };

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
                                            {userDocument?.phone}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex gap-4 justify-between items-center border-b-2 border-gray-300 py-2'>
                                    <div className='flex gap-4 items-center'>
                                        <div className='p-2 bg-slate-300 rounded-md'>
                                            <FaLocationDot className='text-3xl' />
                                        </div>
                                        <div className='flex flex-col  justify-center'>
                                            <h3 className='text-xl font-semibold'>
                                                Address
                                            </h3>
                                            <p className='text-lg text-slate-500'>
                                                {truncateWords(editedAddress, 6)}
                                            </p>
                                        </div>
                                    </div>

                                    <div >
                                        <button className='ml-8 px-4 py-2 transparent border-2 border-gray-300  justify-self-end rounded-md' onClick={() => { setAddressModal(true); setIsEditing(true) }}>
                                            Edit
                                        </button>
                                    </div>
                                </div>
                                <div className='flex gap-4 justify-between items-center border-b-2 border-gray-300 py-2'>
                                    <div className='flex gap-4 items-center'>
                                        <div className='p-2 bg-slate-300 rounded-md'>
                                            <IoTime className='text-3xl' />

                                        </div>
                                        <div className='flex flex-col  justify-center'>
                                            <h3 className='text-xl font-semibold'>
                                                Slot
                                            </h3>
                                            <h3>Select Date and Time</h3>
                                            <div>
                                                {/* Replace with your Date Picker */}
                                                <input
                                                    type="date"
                                                    onChange={(e) => handleDateChange(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                {/* Replace with your Time Picker */}
                                                <input
                                                    type="time"
                                                    onChange={(e) => handleTimeChange(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <h4>Selected Time Slot</h4>
                                                <p>{timeSlot ? `${timeSlot.date} ${timeSlot.time}` : "None selected"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col items-start gap-4 justify-between  border-b-2 border-gray-300 py-2'>
                                    <div className='flex gap-4 items-center'>
                                        <div className='p-2 bg-slate-300 rounded-md'>
                                            <RiSecurePaymentFill className='text-3xl' />
                                        </div>
                                        <div>
                                            <h3 className='text-xl font-semibold'>
                                                Payment Method
                                            </h3>
                                        </div>
                                    </div>

                                    <div className='flex flex-col w-full gap-2 justify-center'>

                                        <button className='bg-black text-white p-2 rounded-md w-full text-center' onClick={() => handlePayment(totalPrice + (totalPrice * 0.18))}>
                                            Pay {totalPrice + (totalPrice * 0.18)}
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </section>

                        <div className='w-[40%]'>
                            <PaymentSummary totalPrice={totalPrice} />
                        </div>
                    </div>
                </div>
            </div>
            {
                addressModal && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-4 rounded-lg" ref={addressModalRef}>
                            <div className="flex items-center gap-2">
                                <FaLocationDot className="text-3xl" />
                                <h2 className="text-lg font-semibold">Address</h2>
                            </div>

                            <div className="mt-4">
                                {isEditing ? (
                                    <textarea
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        value={userDocument?.address}
                                        onChange={(e) => setEditedAddress(e.target.value)}
                                        rows="3"
                                    />
                                ) : (
                                    <p className="mt-2">{address}</p>
                                )}
                            </div>

                            <div className="flex justify-end mt-4 gap-2">
                                {isEditing ? (
                                    <>
                                        <button
                                            // onClick={saveAddress}
                                            className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                    >
                                        Edit
                                    </button>
                                )}

                                <button
                                    onClick={() => setAddressModal(false)}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Checkout
