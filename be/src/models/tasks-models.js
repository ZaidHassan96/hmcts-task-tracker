import { pool } from "../config/db.js";

const db = pool;

class TaskModel {
  static async postTask(title, description, status, due_date) {
    try {
      const result = await db.query(
        "INSERT INTO tasks (title, description, status, due_date) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, description, status, due_date]
      );

      return result.rows[0];
    } catch (error) {
      console.error("Failed to post task", error);
      throw {
        status: 500,
        message: "Failed to post task",
      };
    }
  }

  static async fetchTaskById(taskId) {
    try {
      const result = await db.query("SELECT * FROM tasks WHERE id = $1", [
        taskId,
      ]);
      return result.rows[0];
    } catch (error) {
      console.error("Failed to get task", error);
      throw {
        status: 500,
        message: "Failed to get task",
      };
    }
  }

  static async fetchAllTasks() {
    try {
      const result = await db.query("SELECT * FROM tasks;");
      return result.rows;
    } catch (error) {
      console.error("Failed to get all task", error);
      throw {
        status: 500,
        message: "Failed to get all tasks",
      };
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
      console.error("Failed to update task", error);
      throw {
        status: 500,
        message: "Failed to update task",
      };
    }
  }

  static async deleteTask(taskId) {
    try {
      const result = await db.query(
        "DELETE FROM tasks WHERE id = $1 RETURNING *",
        [taskId]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Failed to delete task", error);
      throw {
        status: 500,
        message: "Failed to delete task",
      };
    }
  }
}

export default TaskModel;
