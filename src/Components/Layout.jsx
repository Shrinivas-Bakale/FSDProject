import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '../pages/firebase/firebase';

const Layout = () => {
    const auth = getAuth(firebaseApp);
    const uId = auth.currentUser?.uid;
    const [userState, setUserState] = useState(false)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {

        })
    }, [])
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Toaster position="top-right" reverseOrder={false} />

                {/* Main Content */}
                <main className="flex-grow">
                    <Navbar />

                    <Outlet />
                </main>

                {/* Footer */}
                <Footer />
            </div>

        </>
    )
}

export default Layout
