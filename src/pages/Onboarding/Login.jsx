import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import toast, { Toaster } from 'react-hot-toast';
import { app } from '../firebase/firebase'

const Login = () => {


    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    const navigate = useNavigate()

    const auth = getAuth(app)

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
                                    Nexenstial
                                </h1>
                            </div>

                        </div>

                        <div className='flex flex-col justify-center'>
                            <form action="" onSubmit={login}>

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

                                <div className='mt-4 w-full'>
                                    <h2 className='text-2xl'>
                                        Password
                                    </h2>
                                    <input type="password"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        placeholder='Password'
                                        className='p-2 rounded-lg mt-2 w-full' />
                                </div>

                                <div className='mt-4 w-full'>
                                    <button className='p-2 rounded-lg mt-2 w-full hover:bg-NavLinkHover hover:text-black text-NavLinkText bg-NavLinkBackground' type='submit' >Login</button>
                                </div>
                            </form>

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
