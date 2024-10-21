import React from 'react'
import logo from "../assets/service-logo-template-design-vector_20029-567.avif"
import { IoCartOutline } from "react-icons/io5";
import { NavLink, useNavigate } from 'react-router-dom';
import { BsInstagram } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";


const Navbar = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className=' bg-lightBackground sticky top-0 z-50'>
                <div className='container mx-auto '>
                    <div className='grid grid-cols-1'>
                        <nav className='  border-[#36302a]'>
                            <div className='flex justify-between items-center text-[#f6f3ec] p-1 px-10 text-xl'>
                                <div className='logo flex gap-9 items-center'>
                                    {/* <img src={logo} alt="" className='w-20' /> */}
                                    <button onClick={() => navigate("/")}>

                                        <h1 className='main-logo text-[38px] mt-3'>
                                            Nexenstial
                                        </h1>
                                    </button>
                                    <div className='flex gap-5 items-center '>




                                    </div>
                                </div>


                                <div>
                                </div>

                                <div className='flex gap-6 items-center'>

                                    {/* <BsWhatsapp className='text-xl' />
                                    <BsInstagram className='text-xl' /> */}

                                    {/* <NavLink className="underline-link">
                                        <h3>Beauty</h3>
                                    </NavLink>
                                    <NavLink className="underline-link">
                                        <h3>Homes</h3>
                                    </NavLink> */}

                                    <NavLink className="underline-link" to={"/login"}> Login</NavLink>
                                    <NavLink>
                                        <IoCartOutline className='text-3xl' />
                                    </NavLink>
                                    <NavLink className=' p-4 text-xl bg-transparent text-NavLinkText rounded-lg hover:bg-NavLinkHover border-2 border-[#fafafa] hover:text-NavLinkBackground'>Get in touch</NavLink>




                                </div>

                            </div>
                        </nav>
                    </div>

                </div>
            </div>


        </>
    )
}

export default Navbar
