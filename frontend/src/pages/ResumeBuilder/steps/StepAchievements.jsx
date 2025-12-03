import React, { useState, useEffect } from "react";
import { TrophyIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function StepAchievements({ data, update, next, back }) {
  const [achievements, setAchievements] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setAchievements(data.achievements || []);
  }, [data.achievements]);

  const addAchievement = () => {
    if (!input.trim()) return;
    setAchievements([...achievements, input.trim()]);
    setInput("");
  };

  const removeAchievement = (index) => {
    const list = [...achievements];
    list.splice(index, 1);
    setAchievements(list);
  };

  const save = () => {
    update("achievements", achievements);
    next();
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <TrophyIcon className="w-7 text-purple-600" />
        Achievements
      </h2>

      <div className="bg-white/80 backdrop-blur-xl shadow-xl border border-gray-200 rounded-3xl p-6 space-y-6">
        <label className="text-sm font-medium text-gray-600">
          Add your awards, achievements, or recognitions
        </label>

        <div className="flex gap-3">
          <input
            className="flex-1 bg-gray-50 border border-gray-300 rounded-2xl p-3 
            focus:ring-2 focus:ring-purple-500 outline-none transition"
            placeholder="e.g. Winner of Hackathon 2024"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            onClick={addAchievement}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
          >
            <PlusIcon className="w-5" />
            Add
          </button>
        </div>

        {achievements.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-1">
            {achievements.map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-gray-100 border border-gray-300 
                px-4 py-2 rounded-full text-gray-800"
              >
                {a}
                <button onClick={() => removeAchievement(i)}>
                  <XMarkIcon className="w-4 text-red-500 hover:text-red-700 transition" />
                </button>
              </div>
            ))}
          </div>
        )}
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
