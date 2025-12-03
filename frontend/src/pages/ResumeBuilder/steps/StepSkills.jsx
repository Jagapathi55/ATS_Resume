import React, { useState, useEffect } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function StepSkills({ data, update, next, back }) {
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setSkills(data.skills || []);
  }, [data.skills]);

  const addSkill = () => {
    if (!input.trim()) return;
    setSkills([...skills, input.trim()]);
    setInput("");
  };

  const removeSkill = (index) => {
    const list = [...skills];
    list.splice(index, 1);
    setSkills(list);
  };

  const save = () => {
    update("skills", skills);
    next();
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>

      <div className="bg-white/80 backdrop-blur-xl shadow-xl border border-gray-200 rounded-3xl p-6 space-y-6 transition-all">
        <label className="text-sm font-medium text-gray-600">
          Add your skills one by one
        </label>

        <div className="flex gap-3">
          <input
            className="flex-1 bg-gray-50 border border-gray-300 rounded-2xl p-3
              focus:ring-2 focus:ring-purple-500 outline-none transition"
            placeholder="e.g. Java, Python, React"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            onClick={addSkill}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 text-white 
              hover:bg-purple-700 transition shadow"
          >
            <PlusIcon className="w-5" />
            Add
          </button>
        </div>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-1">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-100 border border-gray-300 
                  px-4 py-2 rounded-full text-gray-800"
              >
                {skill}

                <button onClick={() => removeSkill(index)}>
                  <XMarkIcon className="w-4 text-red-500 hover:text-red-700 transition" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center pt-4">
          <button
            onClick={back}
            className="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-medium 
              hover:bg-gray-300 transition"
          >
            ← Back
          </button>

          <button
            onClick={next}
            className="px-6 py-2 rounded-xl bg-gray-300 text-gray-700 font-medium 
              hover:bg-gray-400 transition"
          >
            Skip →
          </button>

          <button
            onClick={save}
            className="px-8 py-2 rounded-xl bg-purple-600 text-white font-medium 
              hover:bg-purple-700 shadow-md transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
