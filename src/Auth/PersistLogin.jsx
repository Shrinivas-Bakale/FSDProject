import React, { useEffect, useState } from 'react'
import { firebaseApp } from '../pages/firebase/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Navigate, Outlet } from 'react-router-dom'


const PersistLogin = () => {
    const [userState, setUserState] = useState()

    const auth = getAuth(firebaseApp)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserState(true)
            } else {
                setUserState(false)
            }
        })
    }, [])

    return userState ? <Outlet /> : <Navigate to='/login' replace />

}

export default PersistLogin
