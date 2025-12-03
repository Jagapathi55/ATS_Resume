import React, { useState, useEffect } from "react";
import { PencilSquareIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { generateSummaryAPI } from "../../../api/ai";

export default function StepSummary({ data, update, next, back }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => setSummary(data.summary || ""), [data.summary]);

  const generateAI = async () => {
    try {
      setLoading(true);

      const about = `${data.personalInfo?.fullName || ""}, ${
        data.personalInfo?.location || ""
      }`;

      const aiText = await generateSummaryAPI(about);
      setSummary(aiText || "");
    } catch {
      alert("AI Error");
    } finally {
      setLoading(false);
    }
  };

  const save = () => {
    update("summary", summary);
    next();
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Professional Summary
      </h2>

      <div className="bg-white/80 backdrop-blur-xl shadow-xl border border-gray-200 rounded-3xl p-6 space-y-6 transition-all">
        <label className="text-sm font-medium text-gray-600">
          Write a short introduction about yourself
        </label>

        <div className="relative">
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full h-40 resize-none bg-gray-50 border border-gray-300 rounded-2xl p-4
              focus:ring-2 focus:ring-purple-500 outline-none transition-all text-gray-800"
            placeholder="Write a 3–4 line professional summary..."
          ></textarea>

          <PencilSquareIcon className="w-6 text-gray-400 absolute right-3 bottom-3" />
        </div>

        <button
          onClick={generateAI}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-100 text-purple-700 
            hover:bg-purple-200 transition font-medium"
        >
          <SparklesIcon className="w-5" />
          {loading ? "Generating..." : "Generate with AI"}
        </button>

        <div className="flex justify-between items-center pt-4">
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
    </div>
  );
}
