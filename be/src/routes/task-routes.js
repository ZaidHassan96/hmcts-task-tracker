import express from "express";
import TaskController from "../controllers/tasks-controllers.js";
import TaskMiddleware from "../middlewares/tasks-middlewares.js";
const taskRouter = express.Router();

taskRouter.post(
  "/",
  TaskMiddleware.validateCreateTask,
  TaskController.uploadTask
);

taskRouter.get(
  "/:id",
  TaskMiddleware.validateTaskIdParam,
  TaskController.getTaskById
);

taskRouter.get("/", TaskController.getAllTasks);

taskRouter.patch(
  "/:id",
  TaskMiddleware.validateTaskIdParam,
  TaskMiddleware.validateStatusUpdate,
  TaskController.updateStatus
);

taskRouter.delete(
  "/:id",
  TaskMiddleware.validateTaskIdParam,
  TaskController.removeTask
);
export default taskRouter;
