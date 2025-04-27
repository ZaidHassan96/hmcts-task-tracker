import React from "react";
import axios from "axios";

const UpdateStatus = ({ id, setTasks, tasks, setSettingsButton }) => {
  const changeStatus = async (id, status) => {
    const prevTasks = tasks;

    // Optimistic UI: update the task status before the request
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, status } : task))
    );

    try {
      const response = await axios.patch(`http://localhost:9090/tasks/${id}`, {
        status: status,
      });
      if (response.status !== 200) {
        throw new Error("Delete failed");
      }
      setSettingsButton((prev) => !prev);
    } catch (error) {
      console.error("Error", error);
      setTasks(prevTasks);
    }
  };
  return (
    <div class="flex flex-col absolute right-0 bg-gray-800  w-40">
      <button
        onClick={() => changeStatus(id, "Pending")}
        className="p-1 bg-gray-500 hover:bg-gray-600 hover:cursor-pointer text-white rounded-full mb-1"
      >
        Pending
      </button>
      <button
        onClick={() => changeStatus(id, "In Progress")}
        className="p-1 bg-orange-500 hover:bg-orange-600 hover:cursor-pointer text-white rounded-full mb-1"
      >
        In Progess
      </button>
      <button
        onClick={() => changeStatus(id, "Complete")}
        className="p-1 bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white rounded-full "
      >
        Complete
      </button>
    </div>
  );
};

export default UpdateStatus;
