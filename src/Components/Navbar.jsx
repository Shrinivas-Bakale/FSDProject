import React, { useEffect, useRef, useState } from 'react'
// import logo from "../assets/service-logo-template-design-vector_20029-567.avif"
import { IoCartOutline } from "react-icons/io5";
import { NavLink, useNavigate } from 'react-router-dom';
// import { BsInstagram } from "react-icons/bs";
// import { BsWhatsapp } from "react-icons/bs";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { firebaseApp, useFirebase } from '../pages/firebase/firebase';
import { FaUser } from 'react-icons/fa'


const Navbar = () => {
    const navigate = useNavigate();
    const [loginButtonVisibility, setLoginButtonVisibility] = useState(true)
    const [user, setUser] = useState(null);
    const [profileDropdown, setProfileDropdown] = useState(false)

    const auth = getAuth(firebaseApp);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoginButtonVisibility(false)
                setUser(user)
                console.log(user)
            }
            else {
                setLoginButtonVisibility(true)
                setUser(null)
            }
        })
    }, [])

    const FirebaseContext = useFirebase()
    console.log(FirebaseContext.user)

    const userDropdownRef = useRef()

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
            setProfileDropdown(false);
        }
    };

    return (
        <>
            <div className=' bg-lightBackground sticky top-0 z-30'>
                <div className='container mx-auto '>
                    <div className='grid grid-cols-1'>
                        <nav className='  border-[#36302a]'>
                            <div className='flex justify-between items-center text-[#f6f3ec] p-1 px-10 text-xl'>
                                <div className='logo flex gap-9 items-center'>
                                    {/* <img src={logo} alt="" className='w-20' /> */}
                                    <button onClick={() => navigate("/")}>

                                        <h1 className='main-logo text-[38px] mt-3'>
                                            Nexesential
                                        </h1>
                                    </button>
                                    <div className='flex gap-5 items-center '>

                                    </div>
                                </div>


                                <div>
                                </div>

                                <div className='flex gap-6 items-center relative'>

                                    {/* <BsWhatsapp className='text-xl' />
                                    <BsInstagram className='text-xl' /> */}

                                    {/* <NavLink className="underline-link">
                                        <h3>Beauty</h3>
                                    </NavLink>
                                    <NavLink className="underline-link">
                                        <h3>Homes</h3>
                                    </NavLink> */}
                                    {
                                        loginButtonVisibility ?
                                            <NavLink className="underline-link" to={"/login"}> Login</NavLink>
                                            : null
                                    }
                                    <NavLink to={"/cart"}>
                                        <IoCartOutline className='text-3xl' />
                                    </NavLink>
                                    {loginButtonVisibility ?
                                        null :
                                        <>
                                            <div className=''>
                                                <button onClick={() => setProfileDropdown(!profileDropdown)} className='flex items-center gap-2'>
                                                    <FaUser className='text-2xl' />

                                                    <span>
                                                        <svg
                                                            className={`fill-current h-4 w-4 transform transition duration-150 ease-in-out ${profileDropdown ? "rotate-180" : "rotate-0"}`}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                        </svg>
                                                    </span>
                                                </button>



                                            </div>
                                        </>
                                    }

                                    <NavLink className=' p-4 text-xl bg-transparent text-NavLinkText rounded-lg hover:bg-NavLinkHover border-2 border-[#fafafa] hover:text-NavLinkBackground'>Get in touch</NavLink>


                                    {profileDropdown &&
                                        (
                                            <div className='w-full absolute transform transition duration-150 ease-in-out top-full bottom-0 text-black  mt-1 md:mt-2 ' ref={userDropdownRef}>
                                                <div className='flex flex-col p-2 border-2 border-black bg-white'>
                                                    <div className='border-b-[1px] py-1 border-black w-full'>
                                                        <p className='text-lg ' >
                                                            {user.displayName || user.email}
                                                        </p>
                                                    </div>
                                                    <div className='py-1'>
                                                        <button className='text-lg' onClick={() => { signOut(auth); location.reload() }}>
                                                            Logout
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

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
