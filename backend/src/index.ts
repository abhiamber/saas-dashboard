import express from "express";
import { connectDB } from "./config/database";
import dotenv from "dotenv"
dotenv.config();
import { allRoutes } from "./routes";
import { globalErrorHandler } from "./middleware/error-handler-middleware";
const app = express();
app.use(express.json());
app.use("api", allRoutes)
app.get("/", (req, res) => {
  res.send("Server running...");
});
app.use(globalErrorHandler);


app.listen(4000, () => {
  connectDB();

  console.log("Server is running on port 4000");
});
