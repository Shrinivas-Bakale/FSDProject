import React from 'react'
import logo from "../../assets/service-logo-template-design-vector_20029-567.avif"

const Login = () => {
    return (
        <div className='login-background  min-h-screen'>
            <div className='login-shadow min-h-screen'>
                <div className='flex justify-center items-center '>
                    <div className='p-5 flex flex-col justify-center w-1/3 bg-lighterBackground text-darkText mt-32 rounded-lg'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <h1 className='text-3xl'>
                                    Login
                                </h1>
                            </div>

                            <div>
                                <img src={logo} alt="" className='w-20' />
                            </div>

                        </div>

                        <div className='flex flex-col justify-center'>
                            <div className='mt-4 w-full'>
                                <h2 className='text-2xl'>
                                    Email
                                </h2>
                                <input type="text" placeholder='Email' className='p-2 rounded-lg mt-2 w-full' />
                            </div>

                            <div className='mt-4 w-full'>
                                <h2 className='text-2xl'>
                                    Password
                                </h2>
                                <input type="password" placeholder='Password' className='p-2 rounded-lg mt-2 w-full' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
