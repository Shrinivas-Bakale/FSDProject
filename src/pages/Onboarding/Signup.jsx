import React from 'react'
import logo from "../../assets/service-logo-template-design-vector_20029-567.avif"


const Signup = () => {
  return (
    <div>
      <div className='login-background  min-h-screen'>
        <div className='login-shadow min-h-screen'>
          <div className='flex justify-center items-center '>
            <div className='p-5 flex flex-col justify-center w-1/4 bg-lighterBackground text-darkText mt-32 rounded-lg'>
              <div className='flex justify-between items-center'>
                <div>
                  <h1 className='text-3xl'>
                    Sign Up
                  </h1>
                </div>

                <div>
                  <h1 className='main-logo text-3xl mt-1'>
                    Nexenstial
                  </h1>
                </div>

              </div>

              <div className='flex flex-col justify-center'>
                <div className='mt-4 w-full'>
                  <label className='text-2xl'>
                    Email
                  </label>
                  <input type="text" placeholder='Email' className='p-2 rounded-lg mt-2 w-full' />
                </div>

                <div className='mt-4 w-full'>
                  <label className='text-2xl'>
                    Password
                  </label>
                  <input type="password" placeholder='Password' className='p-2 rounded-lg mt-2 w-full' />
                </div>

                <div className='mt-4 w-full'>
                  <button className='p-2 rounded-lg mt-2 w-full hover:bg-NavLinkHover text-NavLinkText bg-NavLinkBackground'>Sign up</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
