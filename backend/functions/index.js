const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

// Importing routes
const exampleRoutes = require("./routes/example.routes.js");
const usersRoutes = require("./routes/users.routes.js");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: true }));

// Test route
app.get("/hello-world", (req, res) => {
  return res.status(200).send("Hello World");
});

// Routes
app.use("/api/example", exampleRoutes);
app.use("/api/users", usersRoutes);

// Export the Cloud Function
exports.napi = functions.https.onRequest(app);
