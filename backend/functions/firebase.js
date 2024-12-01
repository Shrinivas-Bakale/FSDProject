const admin = require("firebase-admin");
const { readFileSync } = require("fs"); // Use readFileSync for synchronous reading

// Read the service account JSON synchronously
const serviceAccount = JSON.parse(readFileSync("./permissions.json", "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fsdproject-2f44c-default-rtdb.firebaseio.com",
});

const db = admin.firestore();

module.exports = { db };
