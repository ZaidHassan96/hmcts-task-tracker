import React, { useState } from "react";
import axios from "axios";
import UpdateStatus from "./UpdateStatus";

const UpdateTask = ({ setSettingsButton, id, setTasks, tasks }) => {
  const [updateStatus, setUpdateStatus] = useState(false);

  const deleteTask = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!shouldDelete) {
      return;
    }

    const prevTasks = tasks;
    setTasks((tasks) => tasks.filter((task) => task.id !== id)); // optimistic UI

    try {
      const response = await axios.delete(`http://localhost:9090/tasks/${id}`);
      if (response.status !== 200) {
        throw new Error("Delete failed");
      }
      setSettingsButton((prev) => !prev);
    } catch (error) {
      console.error("Error", error);
      setTasks(prevTasks); // rollback in case of failure
    }
  };

  return (
    <>
      {updateStatus ? (
        <UpdateStatus
          setSettingsButton={setSettingsButton}
          setTasks={setTasks}
          tasks={tasks}
          id={id}
        />
      ) : (
        <div className="absolute right-0 bg-gray-800  p-2 w-40 z-4 text-right">
          <button
            onClick={() => setUpdateStatus(!updateStatus)}
            className="block w-full text-right px-2 py-1 hover:text-orange-500 transition-colors duration-200"
          >
            Update Status
          </button>
          <button
            onClick={() => deleteTask(id)}
            className="block w-full text-right px-2 py-1 hover:text-orange-500 transition-colors duration-200"
          >
            Delete Task
          </button>
        </div>
      )}
    </>
  );
};

export default UpdateTask;
