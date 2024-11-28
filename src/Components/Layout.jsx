import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

const Layout = () => {
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
