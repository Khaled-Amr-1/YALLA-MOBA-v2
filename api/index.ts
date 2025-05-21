// api/index.ts
import express from 'express';
import serverless from 'serverless-http';

const app = express();
app.use(express.json());

// Register route
app.post('/users/register', (req, res) => {
  res.status(200).json({ message: "User registered!" });
});

export default serverless(app);
