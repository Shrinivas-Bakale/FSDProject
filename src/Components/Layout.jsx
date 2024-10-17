import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <main>
            <Navbar />
            <Outlet />
            <Footer />
        </main>
    )
}

export default Layout
