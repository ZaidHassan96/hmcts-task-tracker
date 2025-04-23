import express from "express";
import TaskController from "../controllers/tasks-controllers.js";
import TaskMiddleware from "../middlewares/tasks-middlewares.js";
const taskRouter = express.Router();


taskRouter.post("/",
    TaskController

)

taskRouter.get(
  "/:id",
  TaskMiddleware.validateTaskIdParam,
  TaskController.getTaskById
);

taskRouter.get("/", TaskController.getAllTasks);



export default taskRouter;
