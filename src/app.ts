import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";
import routes from './routes';


dotenv.config();

const app = express();
app.use(express.json());

app.use('/', routes);


app.use(errorHandler);

export default app;
