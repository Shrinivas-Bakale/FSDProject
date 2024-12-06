import React, { useEffect, useRef, useState } from "react";
import fossil from "../assets/Fossil Men's Neutra Chronograph Brown Leather Strap Watch 44mm - Macy's.jpg";
import { NavLink } from "react-router-dom";
import PaymentSummary from "./PaymentSummary";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "./firebase/firebase";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const Cart = () => {
    const [cartItems, setCartItems] = useState(() => {
        // Load cartItems from local storage on initial load
        const savedCartItems = localStorage.getItem("cartItems");
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });
    const auth = getAuth(firebaseApp);
    const uId = auth.currentUser?.uid;
    const [totalPrice, setTotalPrice] = useState(0);

    const getCartItems = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5001/fsdproject-2f44c/us-central1/napi/api/cart/getCartItems/${uId}`
            );
            const fetchedItems = response.data || [];
            setCartItems(fetchedItems); // Update state
            calculateTotal(fetchedItems); // Calculate total
            localStorage.setItem("cartItems", JSON.stringify(fetchedItems)); // Save to local storage
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) => sum + parseFloat(item.price), 0);
        setTotalPrice(total);
    };

    useEffect(() => {
        if (uId) {
            getCartItems();
        }
    }, []);
    

    // Save cart items to local storage whenever they change
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const handleDelete = (id) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCartItems); // Update state
        calculateTotal(updatedCartItems); // Recalculate total
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); // Update local storage

        // Optionally, update the backend
        axios
            .delete(`http://localhost:5001/fsdproject-2f44c/us-central1/napi/api/cart/removeFromCart/${uId}/${id}`)
            .then(() => {
                toast.success("Item removed from cart successfully!");
            })
            .catch((error) => {
                console.error("Error deleting item:", error);
                toast.error("Failed to remove item. Please try again.");
            });
    };

    return (
        <div>
            <div className="container mx-auto">
                <div className="grid grid-cols-1">
                    <div className="flex items-center justify-start gap-5 px-52 py-5 border-b-2 border-gray-200 mx-8">
                        <FaShoppingCart className="text-4xl" />
                        <h1 className="text-3xl">Your Cart</h1>
                    </div>
                    <div className="flex px-52 py-5 justify-between mx-auto w-full">
                        <section className="w-[50%]">
                            <div>
                                {cartItems.length > 0 ? (
                                    cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center gap-5 rounded-lg shadow-md bg-slate-200 m-2 p-6 relative">
                                            {/* <button
                                                className="absolute top-2 right-2 rounded-full text-black w-6 h-6 flex items-center justify-center text-4xl"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                &times;
                                            </button> */}
                                            <div>
                                                <img
                                                    src={item.pictureUrl || fossil}
                                                    alt={item.serviceHead}
                                                    className="w-[112px] h-[112px] drop-shadow-lg"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <h1 className="text-xl whitespace-nowrap">{item.serviceHead}</h1>
                                                <div>
                                                    <p className="text-lg">₹{item.price}</p>
                                                </div>
                                                <div className="flex justify-center items-center w-[234px] ">
                                                    <NavLink
                                                        to="/checkout"
                                                        state={{ totalPrice }}
                                                        className="bg-black text-white px-10 py-3 whitespace-nowrap rounded-md w-full text-center"

                                                    >
                                                        Proceed to Checkout
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
                        <div className="w-[40%]">
                            <PaymentSummary totalPrice={totalPrice} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;    