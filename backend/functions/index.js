import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import exampleRoutes from "./routes/example.routes.js"; // Note the .js extension

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: true }));

// Test route
app.get("/hello-world", (req, res) => {
  return res.status(200).send("Hello World");
});

// Use example routes
app.use("/api/example", exampleRoutes);

// Export Firebase Function
export const napi = functions.https.onRequest(app);
