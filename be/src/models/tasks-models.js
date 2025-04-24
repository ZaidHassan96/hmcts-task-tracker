import { pool } from "../config/db.js";

const db = pool;

class TaskModel {
  static async postTask(title, description, status, due_date) {
    try {
      const result = await db.query(
        "INSERT INTO tasks (title, description, status, due_date) VALUES ($1, $2, $3, $4)",
        [title, description, status, due_date]
      );

      return result.rows[0];
    } catch (error) {
      console.error("Error fetching Posting task:", error);
      throw new Error("Database error");
    }
  }

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

  static async patchStatus(taskId, status) {
    try {
      const result = await db.query(
        "UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *",
        [status, taskId]
      );

      return result.rows[0];
    } catch (error) {
      console.error("Error updating:", error);
      throw new Error("Database error");
    }
  }
}

export default TaskModel;
