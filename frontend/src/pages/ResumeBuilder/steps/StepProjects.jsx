import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  TrashIcon,
  CodeBracketIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { generateProjectPointsAPI } from "../../../api/ai";
import toast from "react-hot-toast";

export default function StepProjects({ data, update, next, back }) {
  const [items, setItems] = useState([]);
  const [loadingIndex, setLoadingIndex] = useState(null);

  useEffect(() => setItems(data.projects || []), [data.projects]);

  const add = () =>
    setItems([
      ...items,
      { title: "", tech: "", description: "", bullets: [""] },
    ]);

  const remove = (i) => {
    const c = [...items];
    c.splice(i, 1);
    setItems(c);
  };

  const change = (i, field, value) => {
    const c = [...items];
    c[i][field] = value;
    setItems(c);
  };

  const changeBullet = (pi, bi, value) => {
    const updated = [...items];
    updated[pi].bullets[bi] = value;
    setItems(updated);
  };

  const addBullet = (pi) => {
    const updated = [...items];
    updated[pi].bullets.push("");
    setItems(updated);
  };

  const removeBullet = (pi, bi) => {
    const updated = [...items];
    updated[pi].bullets.splice(bi, 1);
    setItems(updated);
  };

  const generateAI = async (i) => {
    const project = items[i];

    if (!project.title && !project.description) {
      toast.error("Enter at least Title or Description for AI");
      return;
    }

    try {
      setLoadingIndex(i);

      const result = await generateProjectPointsAPI(project);

      const bullets = result
        .split("\n")
        .map((l) => l.replace(/^[-*\d.\)\s]+/, "").trim())
        .filter(Boolean);

      change(i, "bullets", bullets);
    } catch (err) {
      alert("AI Error");
      console.log(err);
    }

    setLoadingIndex(null);
  };

  const save = () => {
    update("projects", items);
    next();
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <CodeBracketIcon className="w-7 text-purple-600" />
        Projects
      </h2>

      {items.map((p, i) => (
        <div
          key={i}
          className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl p-6 space-y-4 mb-6"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 text-lg">
              Project #{i + 1}
            </h3>

            <button
              onClick={() => remove(i)}
              className="text-red-500 hover:bg-red-100 p-2 rounded-xl transition"
            >
              <TrashIcon className="w-5" />
            </button>
          </div>

          {/* TITLE */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Project Title
            </label>
            <input
              className="w-full mt-1 p-3 rounded-xl bg-gray-50 border border-gray-300 
              focus:ring-2 focus:ring-purple-500 outline-none transition"
              placeholder="Project..."
              value={p.title}
              onChange={(e) => change(i, "title", e.target.value)}
            />
          </div>

          {/* TECH */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Technologies (comma separated)
            </label>
            <input
              className="w-full mt-1 p-3 rounded-xl bg-gray-50 border border-gray-300
              focus:ring-2 focus:ring-purple-500 outline-none transition"
              placeholder="Ex: Java, Spring, MySQL"
              value={p.tech}
              onChange={(e) => change(i, "tech", e.target.value)}
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Description
            </label>
            <textarea
              className="w-full mt-1 p-3 rounded-xl bg-gray-50 border border-gray-300 h-24
              focus:ring-2 focus:ring-purple-500 outline-none transition"
              placeholder="Short description of the project..."
              value={p.description}
              onChange={(e) => change(i, "description", e.target.value)}
            />
          </div>

          {/* AI GENERATE */}
          <button
            onClick={() => generateAI(i)}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-100 text-purple-700 
            hover:bg-purple-200 transition font-medium"
            disabled={loadingIndex === i}
          >
            <SparklesIcon className="w-5" />
            {loadingIndex === i ? "Generating..." : "Generate Bullet Points"}
          </button>

          {/* BULLETS — Editable like summary */}
          <div className="space-y-3 mt-4">
            {p.bullets?.map((b, bi) => (
              <div key={bi} className="flex gap-2 items-start">
                <textarea
                  value={b}
                  onChange={(e) => changeBullet(i, bi, e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl
                  focus:ring-2 focus:ring-purple-500 outline-none transition"
                  rows={2}
                />

                <button
                  onClick={() => removeBullet(i, bi)}
                  className="text-red-500 hover:bg-red-100 p-2 rounded-xl"
                >
                  <TrashIcon className="w-4" />
                </button>
              </div>
            ))}

            <button
              onClick={() => addBullet(i)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
            >
              + Add Bullet
            </button>
          </div>
        </div>
      ))}

      {/* ADD PROJECT */}
      <button
        onClick={add}
        className="flex items-center gap-2 px-5 py-3 mb-8 rounded-xl bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition"
      >
        <PlusIcon className="w-5" />
        Add Project
      </button>

      <div className="flex justify-between items-center">
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
