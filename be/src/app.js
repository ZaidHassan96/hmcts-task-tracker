import express from "express";
import taskRouter from "./routes/task-routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/tasks", taskRouter);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err); // Let Express handle the already-sent response
  }

  if (err.status && err.message && err.errors) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
  }

  if (err.status && err.message) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res.status(500).json({ message: "Internal Server Error" });
});

export default app
