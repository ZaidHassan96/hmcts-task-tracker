import { pool } from "../config/db.js"; // Database connection
import { Pool } from "pg";

const db = pool; // Using the pool to interact with the DB
const dbName = pool.options.host;

class Seeder {
  // Connect to the default `postgres` database to run the `CREATE DATABASE` query
  static async createDatabase() {
    try {
      // Change the connection to the `postgres` database or any other available DB
      const tempPool = new Pool({
        ...pool.options,
        database: "postgres", // Connect to the default "postgres" database to create/drop other databases
      });

      // First, drop the database if it exists
      const dropDbQuery = `DROP DATABASE IF EXISTS ${dbName};`;
      await tempPool.query(dropDbQuery);

      // Now, create the database
      const createDbQuery = `CREATE DATABASE ${dbName};`;
      await tempPool.query(createDbQuery);

      // Close the temporary connection
      await tempPool.end();
    } catch (err) {
      console.error("Error creating database:", err.message);
    }
  }
  // Drop the tasks table if it exists and create it again
  static async createTable() {
    try {
      const dropTableQuery = `DROP TABLE IF EXISTS tasks;`;
      await db.query(dropTableQuery);

      // Create the tasks table
      const createTableQuery = `
        CREATE TABLE tasks (
          id SERIAL PRIMARY KEY,       
          title VARCHAR(100) NOT NULL,  
          description TEXT,            
          status VARCHAR(50) NOT NULL, 
          due_date TIMESTAMP  
        );
      `;
      await db.query(createTableQuery);
    } catch (err) {
      console.error("Error creating table:", err.message);
    }
  }

  // Seed tasks into the tasks table
  static async seed(tasks) {
    try {
      await Promise.all(
        tasks.map((task) => {
          return db.query(
            "INSERT INTO tasks (title, description, status, due_date) VALUES ($1, $2, $3, $4)",
            [task.title, task.description || null, task.status, task.due_date]
          );
        })
      );
    } catch (err) {
      console.error("Seeding error:", err.message);
    }
  }
}

export default Seeder;
