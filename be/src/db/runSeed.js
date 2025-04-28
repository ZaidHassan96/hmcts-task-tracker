import { pool } from "../config/db.js"; // Use the pool to close the DB connection
import tasks from "./data.js"; // Your data array
import Seeder from "./seed.js";

const runSeed = async () => {
  try {
    await Seeder.createDatabase();
    await Seeder.createTable();
    await Seeder.seed(tasks);
  } catch (error) {
    console.error("Error occurred during seeding:", error.message);
  } finally {
    pool.end();
  }
};

runSeed();
