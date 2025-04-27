import React, { useState } from "react";
import TasksList from "../components/TasksList";
import CreateTask from "../components/CreateTask";

const HomePage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div>
      {showCreateForm ? (
        <CreateTask setShowCreateForm={setShowCreateForm} />
      ) : (
        <TasksList setShowCreateForm={setShowCreateForm} />
      )}
    </div>
  );
};

export default HomePage;
