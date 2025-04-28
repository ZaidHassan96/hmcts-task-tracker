import React, { useEffect, useState } from "react";
import axios from "axios";
import StatusButton from "./StatusButton";
import formatDate from "../utils/utils";

const TasksList = ({ setShowCreateForm }) => {
  const [tasks, setTasks] = useState([]);
  // const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:9090/tasks/");
      const allTasks = response.data;
      allTasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
      setTasks(allTasks);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Complete":
        return "bg-green-600 text-white";
      case "In Progress":
        return "bg-orange-500 text-white";
      case "Pending":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-300 text-gray-800";
    }
  };

  return (
    <div className="bg-gray-900 p-4 sm:p-8 md:p-10 lg:p-14">
      <p
        onClick={() => setShowCreateForm((prev) => !prev)}
        className="text-right mb-8 text-white hover:text-orange-500 hover:cursor-pointer transition-colors duration-200"
      >
        Create Task +
      </p>
      <div>
        <ul className="bg-gray-800 divide-y divide-gray-700 text-white rounded-lg p-2 sm:p-4">
          {/* Check if tasks exist */}
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <li key={index} className="py-2 list-none mb-4 sm:mb-8">
                <div className="flex justify-between">
                  <h1 className="text-xl font-bold ml-6">{task.title}</h1>
                  <StatusButton
                    id={task.id}
                    setTasks={setTasks}
                    tasks={tasks}
                  />
                </div>

                <p className="text-left ml-2 sm:ml-6 mt-4 sm:mt-8 mb-2 sm:mb-4">
                  {task.description}
                </p>
                <div className="flex justify-between">
                  <span className="text-s text-gray-400 flex items-center ml-6">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {formatDate(task.due_date)}
                  </span>

                  <span
                    className={`px-3 py-1 sm:w-32 md:w-36 lg:w-40 font-medium rounded-full  ${getStatusBadgeClass(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </div>
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
