import React, { useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
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

  const [emailAndPasswordVisibilty, setEmailAndPasswordVisibilty] = useState(false);

  const auth = getAuth(firebaseApp)

  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmailAndPasswordVisibilty(false);
        console.log(user)
      } else {
        setEmailAndPasswordVisibilty(true);
      }
    })
  })

  console.log(emailAndPasswordVisibilty)

  const signup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword
      (auth, email, password,)
      .then((userCredentials) => {
        console.log(userCredentials)
        toast.success("User Created")
        // setTimeout(() => {
        //   navigate('/login')
        // }, 700)
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.message)
      })
  }

  const signUpWithGoogle = async () => {
    signInWithPopup(auth, googleProvider).then(async (user) => {
      console.log(user)
      toast.success("Signed up with Google.")
      // setTimeout(() => {
      //   navigate('/')
      // }, 700)
      await syncUserWithFirestore(user);
    })
      .catch((error) => {
        console.log(error)
        toast.error(error.message)
      })
  }

  const db = getFirestore();


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    address: "",
    gender: "Male",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid); // Use Firebase UID as the document ID
          const userData = {
            name: formData.name,
            email: user.email,
            phone: formData.phone,
            pincode: formData.pincode,
            address: formData.address,
            gender: formData.gender,
            createdAt: serverTimestamp(),
          };

          await setDoc(userRef, userData, { merge: true });
          console.log("User synced with Firestore:", userData);
          toast.success("User data submitted successfully!");
          setTimeout(() => {
            navigate('/')
          }, 700)
        } catch (error) {
          console.error("Error syncing user with Firestore:", error);
          toast.error("Failed to submit user data.");
        }
      } else {
        toast.error("No authenticated user found.");
      }
    });
  };

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
                    <button onClick={() => navigate('/')}>

                    Nexesential
                    </button>
                  </h1>
                </div>

              </div>

              <div className='flex flex-col justify-center'>

                {!emailAndPasswordVisibilty && (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                        Pincode
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        rows="3"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <span className="block text-sm font-medium text-gray-700">Gender</span>
                      <div className="mt-2 space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === "Male"}
                            onChange={handleChange}
                            className="form-radio text-black focus:ring-black"
                          />
                          <span className="ml-2">Male</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === "Female"}
                            onChange={handleChange}
                            className="form-radio text-black focus:ring-black"
                          />
                          <span className="ml-2">Female</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-center mt-6">
                      <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded">
                        Submit
                      </button>
                    </div>
                  </form>
                )}


                {emailAndPasswordVisibilty && (
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
                )}


                {emailAndPasswordVisibilty && (
                  <>
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
                          Sign up with Google
                        </button>
                      </div>
                    </div>
                  </>

                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
