import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  TrashIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

export default function StepExperience({ data, update, next, back }) {
  const [items, setItems] = useState([]);

  useEffect(() => setItems(data.experience || []), [data.experience]);

  const add = () => {
    setItems([
      ...items,
      {
        role: "",
        company: "",
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
    update("experience", items);
    next();
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <BriefcaseIcon className="w-7 text-purple-600" />
        Work Experience
      </h2>

      <div className="bg-white/80 backdrop-blur-xl shadow-xl border border-gray-200 rounded-3xl p-6 space-y-6 transition-all">
        <button
          onClick={add}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition"
        >
          <PlusIcon className="w-5" />
          Add Experience
        </button>

        {items.map((exp, i) => (
          <div
            key={i}
            className="border border-gray-300 bg-gray-50 rounded-2xl p-5 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-700">Experience #{i + 1}</h3>
              <button
                onClick={() => remove(i)}
                className="text-red-500 hover:bg-red-100 p-2 rounded-xl"
              >
                <TrashIcon className="w-5" />
              </button>
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">Role</label>
              <input
                className="w-full mt-1 p-3 rounded-xl bg-white border border-gray-300 
                focus:ring-2 focus:ring-purple-500 outline-none transition"
                value={exp.role}
                onChange={(e) => change(i, "role", e.target.value)}
                placeholder="Software Engineer"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">
                Company
              </label>
              <input
                className="w-full mt-1 p-3 rounded-xl bg-white border border-gray-300
                focus:ring-2 focus:ring-purple-500 outline-none transition"
                value={exp.company}
                onChange={(e) => change(i, "company", e.target.value)}
                placeholder="Company Name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Start Date
                </label>
                <input
                  className="w-full mt-1 p-3 rounded-xl bg-white border border-gray-300 
                  focus:ring-2 focus:ring-purple-500 outline-none transition"
                  value={exp.startDate}
                  onChange={(e) => change(i, "startDate", e.target.value)}
                  placeholder="Jan 2022"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 font-medium">
                  End Date
                </label>
                <input
                  className="w-full mt-1 p-3 rounded-xl bg-white border border-gray-300 
                  focus:ring-2 focus:ring-purple-500 outline-none transition"
                  value={exp.endDate}
                  onChange={(e) => change(i, "endDate", e.target.value)}
                  placeholder="Present"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">
                Description
              </label>
              <textarea
                className="w-full mt-1 p-3 rounded-xl bg-white border border-gray-300 h-24
                focus:ring-2 focus:ring-purple-500 outline-none transition"
                value={exp.description}
                onChange={(e) => change(i, "description", e.target.value)}
                placeholder="Describe your responsibilities…"
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
