import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// تأكد من تحويل المتغيرات العددية
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT), // DB_PORT بيكون string لازم نعمله Number
});

// Listen for idle client errors
pool.on("error", (err: Error) => {
  console.error("Unexpected error on idle database client", err);
  process.exit(-1);
});

export default pool;
