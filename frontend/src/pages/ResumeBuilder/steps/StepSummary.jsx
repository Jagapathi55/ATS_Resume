import React, { useState, useEffect } from "react";
import { PencilSquareIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { generateSummaryAPI } from "../../../api/ai";
import { toast } from "react-hot-toast";

export default function StepSummary({ data, update, next, back }) {
  const [summary, setSummary] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data.summary && summary === "") {
      setSummary(data.summary);
    }
  }, [data.summary]);

  const generateAI = async () => {
    try {
      setLoading(true);

      const about = `
Skills: ${data.skills?.join(", ") || ""}
Projects: ${(data.projects || [])
        .map((p) => p.name || p.description || "")
        .join(", ")}
Experience: ${(data.experience || []).map((e) => e.title || "").join(", ")}
`;

      const options = await generateSummaryAPI(about);

      if (!options || !Array.isArray(options)) {
        toast.error("AI couldn't generate summaries");
        return;
      }

      setSuggestions(options);
      toast.success("AI generated 4 summaries");
    } catch {
      toast.error("AI error");
    } finally {
      setLoading(false);
    }
  };

  const save = () => {
    update("summary", summary);
    toast.success("Summary saved");
    next();
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Professional Summary
      </h2>

      {suggestions.length > 0 && (
        <div className="space-y-4 mb-6">
          <h3 className="font-semibold text-gray-700">Choose a summary:</h3>

          {suggestions.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setSummary(item);
                toast.success("Summary selected");
              }}
              className="p-4 border rounded-xl bg-white shadow cursor-pointer hover:border-purple-500 transition"
            >
              {item}
            </div>
          ))}
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-xl shadow-xl border border-gray-200 rounded-3xl p-6 space-y-6">
        <label className="text-sm font-medium text-gray-600">
          Your Selected Summary
        </label>

        <div className="relative">
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full h-40 resize-none bg-gray-50 border border-gray-300 rounded-2xl p-4
              focus:ring-2 focus:ring-purple-500 outline-none text-gray-800"
            placeholder="Write a 3–4 line professional summary..."
          ></textarea>

          <PencilSquareIcon className="w-6 text-gray-400 absolute right-3 bottom-3" />
        </div>

        <button
          onClick={generateAI}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-100 text-purple-700 
            hover:bg-purple-200 transition font-medium"
        >
          <SparklesIcon className="w-5" />
          {loading ? "Generating..." : "Generate 4 AI Options"}
        </button>

        <div className="flex justify-between items-center pt-4">
          <button
            onClick={back}
            className="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            ← Back
          </button>

          <button
            onClick={next}
            className="px-6 py-2 rounded-xl bg-gray-300 text-gray-700 hover:bg-gray-400"
          >
            Skip →
          </button>

          <button
            onClick={save}
            className="px-8 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 shadow-md"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
