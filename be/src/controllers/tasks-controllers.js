import TaskModel from "../models/tasks-models.js";

class TaskController {
  async uploadTask(req, res, next) {
    try {
      const { title, description, status, due_date } = req.body;
      const task = await TaskModel.postTask(
        title,
        description,
        status,
        due_date
      );

      res.status(201).json({ message: "Task uploaded successfuly", task });
    } catch (error) {
      next(error);
    }
  }
  async getTaskById(req, res, next) {
    try {
      const taskId = req.params.id;
      const task = await TaskModel.fetchTaskById(taskId);

      if (!task) {
        return next({ status: 404, message: "Task not found" });
      }

      res.status(200).json(task);
    } catch (error) {
      console.error("Error fetching task by id", error);
      next(error);
    }
  }

  async getAllTasks(req, res, next) {
    try {
      const tasks = await TaskModel.fetchAllTasks();

      if (tasks.length === 0) {
        return next({ status: 404, message: "Task not found" });
      }

      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
