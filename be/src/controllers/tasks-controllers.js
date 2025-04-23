import TaskModel from "../models/tasks-models.js";

class TaskController {
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
}

export default new TaskController();
