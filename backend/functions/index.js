import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import exampleRoutes from "./routes/example.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

app.get("/hello-world", (req, res) => {
  return res.status(200).send("Hello World");
});

app.use("/api/example", exampleRoutes);
app.use("/api/users", usersRoutes);

export const napi = functions.https.onRequest(app);
