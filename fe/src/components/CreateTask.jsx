import axios from "axios";
import React, { useState } from "react";
import SuccessIcon from "./SuccessIcon";
import LoadingSpinner from "./LoadingSpinner";

const CreateTask = ({ setShowCreateForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(null);
  const [inputErrors, setInputErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const dateValidator = (dueDate) => {
    const today = new Date();
    const inputDate = new Date(dueDate);

    // Set both to start of day to ignore time part
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate < today;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault(); // Prevents the default form submission
      setIsSubmitting(true);
      // Clear previous errors
      setInputErrors({});

      const newErrors = {};

      if (title.length === 0) {
        newErrors.title = "Title is required.";
      }

      if (!dueDate || dateValidator(dueDate)) {
        newErrors.dueDate = "Due Date is required (cannot select a past date).";
      }

      // If there are any errors, set them and stop submission
      if (Object.keys(newErrors).length > 0) {
        setInputErrors(newErrors);
        setIsSubmitting(false);
        return; // Return early to prevent form submission
      }

      const response = await axios.post("http://localhost:9090/tasks/", {
        title: title,
        status: "Pending",
        description: description,
        due_date: dueDate,
      });

      console.log("Form submitted with the following data:", response.data);
      setSubmitSuccess(true);
      setIsSubmitting(false);
      if (response.status === 201) {
        await delay(2000);
        setShowCreateForm(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
      setError(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-20 mt-20 h-[850px]"
        action=""
      >
        {submitSuccess ? (
          <div>
            <h1 className="mt-80 text-[3rem] text-white">Task Created</h1>
            <SuccessIcon />
          </div>
        ) : (
          <div className="bg-gray-800  text-white rounded-lg p-4 mb-20 ">
            <p
              onClick={() => setShowCreateForm((prev) => !prev)}
              className="text-right mb-8 text-white hover:text-orange-500 hover:cursor-pointer transition-colors duration-200 mr-2"
            >
              Tasks List
            </p>
            <div className="mb-20">
              <label
                htmlFor="title"
                className="block text-xl text-left font-medium text-gray-300"
              >
                Title:
              </label>
              {inputErrors.title && (
                <p className="text-red-500 text-sm mt-1">{inputErrors.title}</p>
              )}
              <input
                type="text"
                id="title"
                name="title"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
                onChange={(e) => {
                  setTitle(e.target.value);
                  setInputErrors((prev) => ({ ...prev, title: null }));
                }}
              />
            </div>

            <div className="mb-20">
              <label
                htmlFor="description"
                className="block text-xl text-left font-medium text-gray-300"
              >
                Description (optional):
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-20">
              {inputErrors.dueDate && (
                <p className="text-red-500 text-sm mt-1">
                  {inputErrors.dueDate}
                </p>
              )}
              <label
                htmlFor="dueDate"
                className="block text-xl text-left font-medium text-gray-300"
              >
                Due Date:
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
                onChange={(e) => {
                  setDueDate(e.target.value);
                  setInputErrors((prev) => ({ ...prev, dueDate: null }));
                }}
              />
            </div>
            {error ? (
              <p className="text-red-500 mb-4">
                Oops, task not created successfully.
                <br />
                Please try again.
              </p>
            ) : null}
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 px-4 rounded hover:cursor-pointer hover:bg-orange-600 transition-colors duration-200 w-full"
              disabled={isSubmitting} // Disable button while loading
            >
              {isSubmitting ? <LoadingSpinner /> : "Submit"}{" "}
              {/* Show spinner when loading */}
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default CreateTask;
