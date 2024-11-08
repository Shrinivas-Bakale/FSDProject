import React, { useEffect, useRef, useState } from 'react'
import SideImage from "../../assets/login-bg.jpg"
import { useNavigate } from 'react-router-dom'
import service from '../../assets/login-bg.jpg'
import { firebaseApp } from '../firebase/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Toaster,toast } from 'react-hot-toast'


const CategoryPage = () => {

    const navigate = useNavigate()
    const [serviceModal, setserviceModal] = useState(false);
    const [userState, setUserState] = useState()

    const serviceModalRef = useRef(null);
    const auth = getAuth(firebaseApp)

    const handleClickOutside = (event) => {
        if (serviceModalRef.current && !serviceModalRef.current.contains(event.target)) {
            setserviceModal(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [1]);


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);




    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserState(true)
            } else {
                setUserState(false)
            }
        })
    }, [])

    const handleBooking = () => {
        if (userState) {
            console.log("got here")
        } else {
            toast('You need to login before booking!', {
                icon: '⚠️'
            });
            setTimeout(() => {
                navigate('/login')
            }, 700)
        }
    }

    return (
        <>
            <div className='bg-[#F0F0F3]'>
                <div className='container mx-auto '>
                    <div className='grid grid-cols-1'>
                        <section className='py-16'>
                            <div className='grid grid-cols-2 gap-12'>
                                <div className='w-full '>
                                    <img src={SideImage} className='object-cover h-full w-full rounded-lg' alt="" />
                                </div>

                                <div className='w-full h-full'>

                                    <div className='flex flex-col '>
                                        <div className='mt-6 flex items-center'>
                                            <h1 className="text-7xl font-semibold relative mr-4">
                                                AC Repair & <br /> Service
                                            </h1>
                                        </div>

                                        <div className='w-full flex flex-col gap-3'>

                                            <div className='flex gap-4 cursor-pointer'
                                                onClick={() => {
                                                    setserviceModal(true);
                                                }}

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
                                                        <img src={SideImage} className='w-full h-full rounded-xl' alt="" />
                                                        {/* text-[#955CFF] */}
                                                        <button className='absolute  -bottom-5  left-10 text-black  rounded-xl flex justify-center items-center border-[1px] border-gray-300 bg-gray-200 mx-auto w-12 py-2 px-9'>
                                                            Add
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='flex gap-4'>
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
                                                        <img src={SideImage} className='w-full h-full rounded-xl' alt="" />
                                                        <button className='absolute  -bottom-5  left-10 text-[#955CFF] rounded-xl flex justify-center items-center border-[1px] border-gray-300 bg-gray-200 mx-auto w-12 py-2 px-9'>
                                                            Add
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='flex gap-4'>
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
                                                        <img src={SideImage} className='w-full h-full rounded-xl' alt="" />
                                                        <button className='absolute  -bottom-5  left-10 text-[#955CFF] rounded-xl flex justify-center items-center border-[1px] border-gray-300 bg-gray-200 mx-auto w-12 py-2 px-9'>
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
            {
                serviceModal && (

                    <div className='fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 gap-4 z-50 flex justify-center items-center' >
                        <section className='px-72 py-16  flex justify-center items-center aos-home' >
                            <div
                                className='w-3/4   rounded-3xl  flex  items-center p-5 gap-4 bg-white' ref={serviceModalRef}>
                                <div className='w-1/2  rounded-3xl'>
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

                                        <p className='text-lg font-semibold mr-3'>
                                            ₹499/-
                                        </p>

                                        <button className='p-2 bg-black text-white text-[18px] whitespace-nowrap  transition-all duration-300 hover:scale-105 font-semibold rounded-xl'
                                            onClick={handleBooking}
                                        >
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

                )
            }
        </>

    )
}

export default CategoryPage

