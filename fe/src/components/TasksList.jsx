import React, { useEffect, useState } from "react";
import axios from "axios";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:9090/tasks/");
      setTasks(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1 className="text-5xl font-bold underline text-center">Tasks</h1>
      <div>
        <ul className="list-disc pl-5">
          {/* Check if tasks exist */}
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <li key={index} className="py-2">
                <h1>{task.title}</h1>
                <p>{task.description}</p>
                <p>{task.status}</p>
                <p>{task.due_date}</p>
              </li>
            ))
          ) : (
            <li>No tasks available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TasksList;
