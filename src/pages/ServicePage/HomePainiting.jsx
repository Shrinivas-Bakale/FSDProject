import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import homePaintingBanner from '../../assets/homePainitingBanner.jpg'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '../firebase/firebase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const HomePainiting = () => {
    const [homePainting, setHomePainting] = useState([]);
    const [mainHeading, setMainHeading] = useState('');
    const [singleService, setSingleService] = useState({});
    const [serviceModal, setserviceModal] = useState(false);
    const [userState, setUserState] = useState()
    const auth = getAuth(firebaseApp)
    const uId = auth.currentUser?.uid; // Get the logged-in user's UID

    const navigate = useNavigate();

    const serviceModalRef = useRef(null);


    const specificCategory = homePainting["homePainting"];
    const specificObject = specificCategory ? specificCategory[0] : null; // Get the first object or null
    console.log(specificObject || null);


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


    const fetchAndCategorizeData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5001/fsdproject-2f44c/us-central1/napi/api/example/getAllServices");
            const data = response.data;

            // Example 1: Group by category
            const groupedByCategory = data.reduce((acc, item) => {
                // Only process items with the category 'homePainting'
                if (item.category === "homePainting") {
                    if (!acc[item.category]) {
                        acc[item.category] = [];
                    }
                    acc[item.category].push(item);
                }
                return acc;
            }, {});

            console.log("Grouped by 'homePainting' Category:", groupedByCategory);
            setHomePainting(groupedByCategory);
            setMainHeading(specificObject.mainHeading || null);
            console.log(specificObject.mainHeading || null);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


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

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserState(true)
            } else {
                setUserState(false)
            }
        })
    }, [])

    const handleAddToCart = async (serviceId) => {
        if (userState) {
            console.log("got here: ", serviceId)
            const userId = uId;
            console.log(typeof userId == "string");
            const payload = {
                serviceId: serviceId,
                quantity: 1,
            };

            try {
                const response = await axios.post(
                    `http://127.0.0.1:5001/fsdproject-2f44c/us-central1/napi/api/cart/addToCart/${userId}`,
                    payload
                );
                console.log("Cart updated successfully:", response.data);
                toast.success("Service added to cart successfully!");
            } catch (error) {
                console.error("Error adding to cart:", error);
                toast.error("Failed to add to cart. Please try again.");
            }
        } else {
            toast.error('You need to login before adding to cart!')
            setTimeout(() => {
                navigate('/login')
            }, 700)
        }
    }

    useEffect(() => {
        console.log("Updated singleService:", singleService);
    }, [singleService]);


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
                                                                onClick={() => { getServiceById(service.id) }}
                                                            >
                                                                <div className="w-3/4 flex flex-col mt-4" onClick={() => setserviceModal(true)}>
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
                                                                            onClick={() => handleAddToCart(service.id)}
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

                    {
                        serviceModal && (

                            <div className='fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 gap-4 flex justify-center items-center'>
                                <section className='px-72 py-16 flex justify-center items-center aos-home'>
                                    {singleService ? (
                                        <div className='w-3/4 rounded-3xl flex z-50 items-center p-5 gap-4 bg-white' ref={serviceModalRef}>
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
            </div>
        </div>
    )
}

export default HomePainiting
