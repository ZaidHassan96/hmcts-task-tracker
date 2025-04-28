import { Pool } from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import createDatabase from "./setup.js";

// Get the current directory of the module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env or .env.test
if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: path.resolve(__dirname, "../..", ".env.test") }); // Pointing to .env.test in root
} else {
  dotenv.config({ path: path.resolve(__dirname, "../..", ".env") }); // Pointing to .env in root
}

const dbName = process.env.DB_NAME;

async function initializeDatabase() {
  await createDatabase(dbName); // Wait for the database to be created
}

// Initialize the database before setting up the pool
await initializeDatabase();

// Create a new Pool instance with appropriate environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  ssl: false, // You can configure SSL as needed
});

export { pool };
