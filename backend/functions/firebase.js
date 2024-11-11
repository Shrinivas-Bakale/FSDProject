// firebase.js
import admin from "firebase-admin";
import serviceAccount from "./permissions.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fsdproject-2f44c-default-rtdb.firebaseio.com",
});

export const db = admin.firestore();
