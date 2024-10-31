import React from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { firebaseApp } from './firebase'

const auth = getAuth(firebaseApp)
const UserAuthentication = () => {

    const signup = () => {
        createUserWithEmailAndPassword
            (auth, 'shinu@example.com', 'pp1234',)
            .then((userCredentials) => {
                console.log(userCredentials)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div>
            <button onClick={signup}>
                Create User
            </button>
        </div>
    )
}

export default UserAuthentication
