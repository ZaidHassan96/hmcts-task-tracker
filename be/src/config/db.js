import { Pool } from "pg";

let pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  ssl: false,
});

// const connectDB = async () => {
//   try {
//     await pool.connect();
//     console.log("PostgreSQL DATABASE connected");
//   } catch (err) {
//     const error = err;
//     console.error("DB connection error:", error.stack || error.message);
//   }
// };

// connectDB()

export { pool };
