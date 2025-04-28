import supertest from "supertest";
import app from "../app.js";
import Seeder from "../db/seed.js";
import { pool } from "../config/db.js";

// Seed the test database before running any tests
beforeAll(async () => {
  await Seeder.createDatabase();
  await Seeder.createTable(); // Ensures the table is created afresh
  await Seeder.seed([
    // Seed test data
    {
      title: "Test Task 1",
      description: "First task",
      status: "Pending",
      due_date: new Date(),
    },
    {
      title: "Test Task 2",
      description: "Second task",
      status: "Completed",
      due_date: new Date(),
    },
    {
      title: "Test Task 3",
      description: "Third task",
      status: "Pending",
      due_date: new Date(),
    },
  ]);
});

// Clean up after all tests (optional but useful)
afterAll(async () => {
  await pool.query("DROP TABLE IF EXISTS tasks"); // Drop tasks table if you want to clean up
  await pool.end(); // Close the DB connection after tests
});

describe("Task API Endpoints", () => {
  // Create a Task
  test("should create a new task", async () => {
    const newTask = {
      title: "New Task",
      description: "This is a new task",
      status: "Pending",
      due_date: new Date().toISOString(),
    };

    const response = await supertest(app)
      .post("/tasks")
      .send(newTask)
      .expect(201);

    const task = response.body.task;

    expect(task).toHaveProperty("id");
    expect(task.title).toBe(newTask.title);
    expect(task.description).toBe(newTask.description);
    expect(task.status).toBe(newTask.status);
    expect(new Date(task.due_date)).toBeInstanceOf(Date);
  });

  // Retrieve All Tasks
  test("should retrieve all tasks", async () => {
    const response = await supertest(app).get("/tasks").expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    response.body.forEach((task) => {
      expect(task).toHaveProperty("id");
      expect(task).toHaveProperty("title");
      expect(task).toHaveProperty("status");
    });
  });

  // Retrieve Task by ID
  test("should retrieve a task by ID", async () => {
    // First, create a new task for testing
    const newTask = {
      title: "Task for Retrieval",
      description: "Test task to retrieve by ID",
      status: "Pending",
      due_date: new Date().toISOString(),
    };

    const createdTask = await supertest(app)
      .post("/tasks")
      .send(newTask)
      .expect(201);

    const taskId = createdTask.body.task.id;

    const response = await supertest(app).get(`/tasks/${taskId}`).expect(200);

    const task = response.body.task;

    expect(task).toHaveProperty("id", taskId);
    expect(task.title).toBe(newTask.title);
    expect(task.description).toBe(newTask.description);
    expect(task.status).toBe(newTask.status);
  });

  // Update Task Status
  test("should update the status of a task", async () => {
    const taskId = 1;
    const newStatus = "In Progress";

    const response = await supertest(app)
      .patch(`/tasks/${taskId}`)
      .send({ status: newStatus })
      .expect(200);

    const task = response.body.task;
    expect(task).toHaveProperty("id", taskId);
    expect(task.status).toBe(newStatus);
  });

  // Delete Task
  test("should delete a task", async () => {
    // First, create a new task for testing
    const newTask = {
      title: "Task to be deleted",
      description: "This task will be deleted",
      status: "Pending",
      due_date: new Date().toISOString(),
    };

    const createdTask = await supertest(app)
      .post("/tasks")
      .send(newTask)
      .expect(201);

    const taskId = createdTask.body.task.id;

    const response = await supertest(app)
      .delete(`/tasks/${taskId}`)
      .expect(200);

    // Ensure the task is deleted
    expect(response.body.message).toBe("Task deleted succesfully");

    // Check if task is really deleted by trying to fetch it again
    await supertest(app).get(`/tasks/${taskId}`).expect(404);
  });
});
