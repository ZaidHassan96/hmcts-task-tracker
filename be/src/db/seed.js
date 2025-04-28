import { pool } from "../config/db.js"; // Database connection

const db = pool; // Using the pool to interact with the DB

class Seeder {
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
