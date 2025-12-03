import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseIcon,
  StarIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

const templates = [
  {
    id: "minimal",
    label: "Minimal Template",
    score: "97%",
    tag: "ATS Friendly",
    tags: ["Minimal", "Clean Layout", "ATS Optimized"],
    icon: BriefcaseIcon,
  },
  {
    id: "modern",
    label: "Modern Template",
    score: "98%",
    tag: "Most Popular",
    tags: ["Modern", "Professional", "Keyword Ready"],
    icon: StarIcon,
  },
  {
    id: "elegant",
    label: "Elegant Template",
    score: "95%",
    tag: "Premium Look",
    tags: ["Elegant", "Soft Design", "ATS Verified"],
    icon: CodeBracketIcon,
  },
];

export default function TemplateSelect() {
  const navigate = useNavigate();

  const chooseTemplate = (t) => {
    navigate(`/editor/new?template=${t}`);
  };

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-10">
        Choose a Resume Template
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {templates.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.id}
              className="bg-white rounded-2xl shadow-md p-6 cursor-pointer 
              hover:shadow-xl hover:-translate-y-1 transition relative"
              onClick={() => chooseTemplate(t.id)}
            >
              <span className="absolute top-4 right-4 bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full">
                {t.tag}
              </span>

              <div className="w-14 h-14 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto">
                <Icon className="w-7" />
              </div>

              <h2 className="text-center font-semibold text-xl mt-4">
                {t.label}
              </h2>

              <p className="mt-3 text-center text-sm font-semibold">
                ATS Score:{" "}
                <span className="text-green-600 font-bold">{t.score}</span>
              </p>

              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {t.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                className="mt-6 w-full py-2 rounded-xl bg-gradient-to-r 
                from-purple-600 to-indigo-600 text-white text-sm font-medium shadow-md
                hover:shadow-lg transition"
              >
                Select →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
