import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import toast, { Toaster } from 'react-hot-toast';
import { firebaseApp } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { FaRegEye } from 'react-icons/fa'
import { FaRegEyeSlash } from 'react-icons/fa'

const Signup = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = useState(false);

  const auth = getAuth(firebaseApp)

  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();


  const signup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword
      (auth, email, password,)
      .then((userCredentials) => {
        console.log(userCredentials)
        toast.success("User Created")
        setTimeout(() => {
          navigate('/login')
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
    <div>
      <Toaster position="top-right" reverseOrder={false} />

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
                    Nexesential
                  </h1>
                </div>

              </div>

              <div className='flex flex-col justify-center'>
                <form action="" onSubmit={signup}>
                  <div className='mt-4 w-full'>

                    <h2 className='text-2xl'>
                      Email
                    </h2>
                    <input type="text"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder='Email'
                      className='p-2 rounded-lg mt-2 w-full' />
                  </div>

                  <div className='relative'>
                                        <button type='button' className='absolute right-0 top-4 ' onClick={() => setShowPassword(!showPassword)}>
                                            {!showPassword ?
                                                <FaRegEye className='w-10 h-5' />
                                                :
                                                <FaRegEyeSlash className='w-10 h-5' />
                                            }
                                        </button>
                                        <input type={showPassword ? "text" : "password"}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }}
                                            placeholder='Password'
                                            className='p-2 rounded-lg mt-2 w-full' />
                                    </div>

                  <div className='mt-4 w-full'>
                    <button
                      type='submit'
                      className='p-2 rounded-lg mt-2 w-full hover:bg-NavLinkHover hover:text-black text-NavLinkText bg-NavLinkBackground'
                    >
                      Sign up
                    </button>
                  </div>
                </form>


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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
