import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="bg-black z-30 border-t border-[#36302a]">
            <div className="container mx-auto">
                <div className="grid grid-cols-1">
                    <div className="flex justify-start items-center p-3">
                        <div className="flex flex-col text-lightText">
                            <h2 className='text-3xl '>
                                Contact Us
                            </h2>

                            <p>123 Demo Street, New York, NY 12345</p>

                            <p>
                                (555) 555-5555 <br />
                                email@example.com
                            </p>

                            <NavLink className=' p-2 text-xl mt-2 w-32 border-2 border-[#fafafa] bg-NavLinkBackground text-NavLinkText rounded-lg hover:bg-NavLinkHover hover:text-NavLinkBackground'>Get in touch</NavLink>
                            <div className='p-2 mt-4'>
                                <Link to={'/addservices'} >
                                    Add Services
                                </Link>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
