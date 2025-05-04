"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// تأكد من تحويل المتغيرات العددية
const pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT), // DB_PORT بيكون string لازم نعمله Number
});
// Listen for idle client errors
pool.on("error", (err) => {
    console.error("Unexpected error on idle database client", err);
    process.exit(-1);
});
exports.default = pool;
