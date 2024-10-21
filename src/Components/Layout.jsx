import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

const Layout = () => {
    return (
        <>
            <div>
                <Toaster position="top-right" reverseOrder={false} />
                <main>
                    <Navbar />
                    <Outlet />
                    <Footer />
                </main>
            </div>
        </>
    )
}

export default Layout
