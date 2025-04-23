import express from "express";
import TaskController from "../controllers/tasks-controllers.js";
import TaskMiddleware from "../middlewares/tasks-middlewares.js";
const taskRouter = express.Router();

taskRouter.get(
  "/:id",
  TaskMiddleware.validateTaskIdParam,
  TaskController.getTaskById
);

export default taskRouter;
