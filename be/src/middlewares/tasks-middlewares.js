import { body, validationResult, param } from "express-validator";

class TaskMiddleware {
  validateCreateTask = [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ max: 100 })
      .withMessage("Title should not exceed 100 characters"),

    body("status")
      .notEmpty()
      .withMessage("Status is required")
      .isLength({ max: 50 })
      .withMessage("status should not exceed 50 characters"),

    body("description")
      .optional() // No validation, just making it optional
      .isString()
      .withMessage("Description must be a string if provided"),

    body("due_date").isISO8601().withMessage("Due date must be a valid date"),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next({
          status: 400,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      next();
    },
  ];
  validateTaskIdParam = [
    param("id").isInt().withMessage("Task ID must be an integer"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next({
          status: 400,
          message: "Invalid task ID parameter",
          errors: errors.array(),
        });
      }
      next();
    },
  ];

  validateStatusUpdate = [
    body("status")
      .notEmpty()
      .withMessage("Status is required")
      .isLength({ max: 50 })
      .withMessage("status should not exceed 50 characters"),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next({
          status: 400,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      next();
    },
  ];
}

export default new TaskMiddleware();
