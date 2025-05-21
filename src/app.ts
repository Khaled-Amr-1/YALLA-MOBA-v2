import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";
import routes from './routes';


dotenv.config();

const app = express();
app.use(express.json());

app.use('/', routes);


app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
export default app;