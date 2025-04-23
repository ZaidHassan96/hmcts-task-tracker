import { pool } from "../config/db.js";
import tasks from "./data.js";


const db = pool

class Seeder {
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
        console.log("Seeding complete");
      } catch (err) {
        console.error("Seeding error:", err);
      }
    }
  }
  
  const runSeeding = Seeder.seed

  runSeeding(tasks)
