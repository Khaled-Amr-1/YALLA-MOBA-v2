import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;
