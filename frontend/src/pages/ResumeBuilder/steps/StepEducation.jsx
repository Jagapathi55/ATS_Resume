import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  TrashIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

export default function StepEducation({ data, update, next, back }) {
  const [items, setItems] = useState([]);

  useEffect(() => setItems(data.education || []), [data.education]);

  const add = () => {
    setItems([
      ...items,
      {
        degree: "",
        school: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const remove = (i) => {
    const list = [...items];
    list.splice(i, 1);
    setItems(list);
  };

  const change = (i, field, value) => {
    const list = [...items];
    list[i][field] = value;
    setItems(list);
  };

  const save = () => {
    update("education", items);
    next();
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <AcademicCapIcon className="w-7 text-purple-600" />
        Education
      </h2>

      <div className="bg-white/80 backdrop-blur-xl shadow-xl border border-gray-200 rounded-3xl p-6 space-y-6 transition-all">
        <button
          onClick={add}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition"
        >
          <PlusIcon className="w-5" />
          Add Education
        </button>

        {items.map((edu, i) => (
          <div
            key={i}
            className="border border-gray-300 bg-gray-50 rounded-2xl p-5 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-700">Education #{i + 1}</h3>
              <button
                onClick={() => remove(i)}
                className="text-red-500 hover:bg-red-100 p-2 rounded-xl"
              >
                <TrashIcon className="w-5" />
              </button>
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">
                Degree
              </label>
              <input
                className="w-full mt-1 p-3 rounded-xl bg-white border border-gray-300 
                focus:ring-2 focus:ring-purple-500 outline-none transition"
                value={edu.degree}
                onChange={(e) => change(i, "degree", e.target.value)}
                placeholder="B.Tech in Computer Science"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">
                School / University
              </label>
              <input
                className="w-full mt-1 p-3 rounded-xl bg-white border border-gray-300
                focus:ring-2 focus:ring-purple-500 outline-none transition"
                value={edu.school}
                onChange={(e) => change(i, "school", e.target.value)}
                placeholder="K L University"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Start Year
                </label>
                <input
                  className="w-full mt-1 p-3 rounded-xl bg-white border border-gray-300 
                  focus:ring-2 focus:ring-purple-500 outline-none transition"
                  value={edu.startDate}
                  onChange={(e) => change(i, "startDate", e.target.value)}
                  placeholder="2021"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 font-medium">
                  End Year
                </label>
                <input
                  className="w-full mt-1 p-3 rounded-xl bg-white border border-gray-300 
                  focus:ring-2 focus:ring-purple-500 outline-none transition"
                  value={edu.endDate}
                  onChange={(e) => change(i, "endDate", e.target.value)}
                  placeholder="2025 or Present"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">
                Description (optional)
              </label>
              <textarea
                className="w-full mt-1 p-3 rounded-xl bg-white border border-gray-300 h-24
                focus:ring-2 focus:ring-purple-500 outline-none transition"
                value={edu.description}
                onChange={(e) => change(i, "description", e.target.value)}
                placeholder="Projects, achievements, GPA, coursework…"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={back}
          className="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
        >
          ← Back
        </button>

        <button
          onClick={next}
          className="px-6 py-2 rounded-xl bg-gray-300 text-gray-700 font-medium hover:bg-gray-400 transition"
        >
          Skip →
        </button>

        <button
          onClick={save}
          className="px-8 py-2 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 shadow-md transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
