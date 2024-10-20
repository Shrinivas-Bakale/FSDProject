import React from 'react'
import { getDatabase, ref, set } from 'firebase/database'
import { app } from '../../pages/firebase/firebase'

const Example = () => {

    const db = getDatabase(app)

    const writeUserData = () => {
        console.log("Hello")
        set(ref(db, 'users/shinu/'), {
            id: 1,
            name: 'shrinivas',
            age: 21
        })
    }

    return (
        <div>
            <button onClick={ writeUserData}>Put Data</button>
        </div>
    )
}

export default Example
