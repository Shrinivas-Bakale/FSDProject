import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, set, ref, get, child } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyA0w1Lc8tB1oeN4BV_ov835egfjm1uptjg",
    authDomain: "fsdproject-2f44c.firebaseapp.com",
    projectId: "fsdproject-2f44c",
    storageBucket: "fsdproject-2f44c.appspot.com",
    messagingSenderId: "514311889638",
    appId: "1:514311889638:web:8f8a6a44a47141ddc09127",
    measurementId: "G-FN29YW4ZTW",
    databaseURL: "https://fsdproject-2f44c-default-rtdb.firebaseio.com/"
};


export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const FirebaseContext = createContext(null);
export const database = getDatabase(firebaseApp);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
    const signUpUsingEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    }

    const putData = (key, data, success, fail) => {
        set(ref(database, key), data)
            .then(() => {
                console.log(success)
            })
            .catch(() => {
                console.log(fail)
            })
    }

    const getDataFromRTDB = (key, successCallback, failCallback) => {
        get(child(ref(database), key))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val()); // Log the retrieved data
                    if (successCallback) {
                        successCallback(snapshot.val()); // Call the success callback if it exists
                    }
                } else {
                    console.log("No data available");
                    if (failCallback) {
                        failCallback("No data available");
                    }
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                if (failCallback) {
                    failCallback(error);
                }
            });
    };

    const [user, setuser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            user ? setuser(user) : setuser(null)
        })

    }, [])


    return (
        <FirebaseContext.Provider value={{ signUpUsingEmailAndPassword, putData, user, getDataFromRTDB }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}


