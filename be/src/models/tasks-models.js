import { pool } from "../config/db.js";

const db = pool;

class TaskModel {
  static async postTask(title, description, status) {}

  static async fetchTaskById(taskId) {
    try {
      const result = await db.query("SELECT * FROM tasks WHERE id = $1", [
        taskId,
      ]);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching task by id:", error);
      throw new Error("Database error");
    }
  }

  static async fetchAllTasks() {
    try {
      const result = await db.query("SELECT * FROM tasks;");
      return result.rows;
    } catch (error) {
      console.error("Error fetching all tasks:", error);
      throw new Error("Database error");
    }
  }
}

export default TaskModel;
