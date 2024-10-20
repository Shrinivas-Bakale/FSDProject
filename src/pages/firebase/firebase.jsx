import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


