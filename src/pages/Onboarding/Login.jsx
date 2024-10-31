import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import toast, { Toaster } from 'react-hot-toast';
import { firebaseApp } from '../firebase/firebase'
import { FaRegEye } from 'react-icons/fa'
import { FaRegEyeSlash } from 'react-icons/fa'
import { FaGoogle } from "react-icons/fa";


const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = useState(false);


    const navigate = useNavigate()

    const auth = getAuth(firebaseApp)


  const googleProvider = new GoogleAuthProvider();

    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword
            (auth, email, password,)
            .then((userCredentials) => {
                console.log(userCredentials)
                toast.success("Logged In Successfully")
                setTimeout(() => {
                    navigate('/')
                }, 700)
            })
            .catch((error) => {
                console.log(error)
                toast.error(error.message)
            })
    }

    const signUpWithGoogle = () => {
        signInWithPopup(auth, googleProvider).then((result) => {
            console.log(result)
            toast.success("Signed up with Google.")
            setTimeout(() => {
                navigate('/')
            }, 700)
        })
            .catch((error) => {
                console.log(error)
                toast.error(error.message)
            })
    }



    return (
        <div className='login-background  min-h-screen'>
            <Toaster position="top-right" reverseOrder={false} />

            <div className='login-shadow min-h-screen'>
                <div className='flex justify-center items-center '>
                    <div className='p-5 flex flex-col justify-center w-1/4 bg-lighterBackground text-darkText mt-32 rounded-lg'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <h1 className='text-3xl'>
                                    Login
                                </h1>
                            </div>

                            <div>
                                <h1 className='main-logo text-3xl mt-1'>
                                    Nexesential
                                </h1>
                            </div>

                        </div>

                        <div className='flex flex-col justify-center'>
                            <form action="" onSubmit={login}>

                                <div className='mt-4 w-full'>
                                    <label htmlFor='email' className='text-2xl'>
                                        Email
                                    </label>
                                    <input type="email"
                                        id='email'
                                        name='email'
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        placeholder='Email'
                                        className='p-2 rounded-lg mt-2 w-full'
                                        autoComplete="email"
                                    />
                                </div>

                                <div className='mt-4 w-full'>
                                    <label htmlFor='password' className='text-2xl'>
                                        Password
                                    </label>
                                    <div className='relative'>
                                        <button type='button' className='absolute right-0 top-4 ' onClick={() => setShowPassword(!showPassword)}>
                                            {!showPassword ?
                                                <FaRegEye className='w-10 h-5' />
                                                :
                                                <FaRegEyeSlash className='w-10 h-5' />
                                            }
                                        </button>
                                        <input type={showPassword ? "text" : "password"}
                                            name='password'
                                            id='password'

                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }}
                                            placeholder='Password'
                                            className='p-2 rounded-lg mt-2 w-full'
                                            autoComplete='current-password'
                                        />
                                    </div>
                                </div>

                                <div className='mt-4 w-full'>
                                    <button className='p-2 rounded-lg mt-2 w-full hover:bg-NavLinkHover hover:text-black text-NavLinkText bg-NavLinkBackground' type='submit' >Login</button>
                                </div>
                            </form>

                        </div>

                        <div className="mt-4 w-full px-4 flex items-center justify-between">
                            <hr className="flex-grow border-t border-gray-400" />

                            <p className="px-4 text-gray-500">or</p>

                            <hr className="flex-grow border-t border-gray-400" />
                        </div>

                        <div className='flex justify-center'>
                            <div className='mt-4 w-full '>
                                <button
                                    onClick={signUpWithGoogle}
                                    className='w-full p-2 rounded-lg flex items-center justify-center hover:bg-NavLinkHover hover:text-black text-NavLinkText bg-NavLinkBackground'>
                                    <FaGoogle className='mr-3' />
                                    Sign in with Google
                                </button>
                            </div>
                        </div>

                        <div className='flex justify-center mt-4 gap-2'>

                            <h3 className='text-base'>
                                Don't have an account?
                            </h3>

                            <button className='underline' onClick={() => navigate("/signup")}>
                                Sign up
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
