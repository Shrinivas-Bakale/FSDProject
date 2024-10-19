import React from 'react'
import logo from "../assets/service-logo-template-design-vector_20029-567.avif"
import { IoCart } from "react-icons/io5";
import { NavLink } from 'react-router-dom';


const Navbar = () => {
    return (
        <>
            <div className=' bg-lightBackground sticky top-0 z-50'>
                <div className='container mx-auto '>
                    <div className='grid grid-cols-1'>
                        <nav className=' border-b-[1px] border-[#36302a]'>
                            <div className='flex justify-between items-center text-[#f6f3ec] p-1 px-10 text-xl'>
                                <div className='logo flex gap-9 items-center'>
                                    <img src={logo} alt="" className='w-20' />
                                    <div className='flex gap-5 items-center '>

                                        <NavLink className="underline-link">
                                            <h3>Beauty</h3>
                                        </NavLink>
                                        <NavLink className="underline-link">
                                            <h3>Homes</h3>
                                        </NavLink>


                                    </div>
                                </div>


                                <div>
                                </div>

                                <div className='flex gap-6 items-center'>
                                    <NavLink>
                                        <IoCart className='text-3xl' />
                                    </NavLink>
                                    <NavLink className="underline-link" to={"/login"}> Login</NavLink>
                                    <NavLink className=' p-2 text-xl bg-NavLinkBackground text-NavLinkText rounded-lg hover:bg-NavLinkHover'>Get in touch</NavLink>
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
