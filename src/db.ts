import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Iamvictor1998.",
  database: "task-manager",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
