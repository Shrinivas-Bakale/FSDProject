import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { createContext, useContext } from "react";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { getDatabase, set, ref } from "firebase/database";


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
// const analytics = getAnalytics(app);


export const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
export const FirebaseContext = createContext(null);
const database = getDatabase(firebaseApp);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
    const signUpUsingEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    }

    const putData = (key, data) => {
        set(ref(database, key), data)
    }

    return (
        <FirebaseContext.Provider value={{ signUpUsingEmailAndPassword, putData }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}


