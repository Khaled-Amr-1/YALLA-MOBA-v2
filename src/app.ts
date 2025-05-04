import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler";
import usersRoutes from './routes/users.routes';


dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/users', usersRoutes);

app.use(errorHandler); // Error handling middleware

export default app;
