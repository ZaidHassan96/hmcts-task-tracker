import React, { useState } from "react";
import UpdateTask from "./UpdateTask";

const StatusButton = ({ id, setTasks, tasks }) => {
  const [settingsButton, setSettingsButton] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setSettingsButton(!settingsButton)}
        className=" text-gray-400 hover:text-orange-500 transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </button>
      {settingsButton ? (
        <UpdateTask setSettingsButton={setSettingsButton} id={id} setTasks={setTasks} tasks={tasks} />
      ) : null}
    </div>
  );
};

export default StatusButton;
