import React from "react";

export default function ProgressBar({ step, onStepChange }) {
  const steps = [
    "Personal",
    "Summary",
    "Experience",
    "Projects",
    "Skills",
    "Education",
    "Achievements",
    "Finish",
  ];

  const percentage = Math.round(((step - 1) / (steps.length - 1)) * 100);

  return (
    <div className="w-full mb-10 select-none">
      <div className="text-right mb-2 text-sm font-medium text-purple-700">
        {percentage}% completed
      </div>

      <div className="relative h-1 bg-gray-200 rounded-full">
        <div
          className="absolute top-0 left-0 h-1 bg-purple-600 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="flex justify-between mt-4">
        {steps.map((label, index) => {
          const isActive = step === index + 1;
          const isCompleted = step > index + 1;

          return (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => onStepChange(index + 1)}
            >
              <div
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold
                  transition-all duration-300 border

                  ${
                    isCompleted
                      ? "bg-purple-600 text-white border-purple-600"
                      : isActive
                      ? "bg-purple-100 text-purple-700 border-purple-500 scale-110 shadow-md"
                      : "bg-white text-gray-600 border-gray-300"
                  }

                  /* ⭐ APPLY HOVER COLOR FOR ALL STATES ⭐ */
                  group-hover:bg-purple-50 
                  group-hover:border-purple-400 
                  group-hover:text-purple-700
                `}
              >
                {isCompleted ? "✓" : index + 1}
              </div>

              <span
                className={`
                  mt-2 text-xs transition-all
                  ${
                    isActive
                      ? "text-purple-700 font-semibold"
                      : "text-gray-600 group-hover:text-purple-600"
                  }
                `}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
