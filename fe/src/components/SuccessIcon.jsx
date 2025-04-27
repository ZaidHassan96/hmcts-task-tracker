import React from "react";

const SuccessIcon = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-full bg-green-100 p-2">
        <svg
          className="w-8 h-8 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>
  );
};

export default SuccessIcon;
