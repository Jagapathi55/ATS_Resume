import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function AtsCheck() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resumeText, setResumeText] = useState("");

  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    api
      .get(`/resume/${id}`)
      .then((res) => setResumeText(res.data.extractedText || ""))
      .catch(() => alert("Failed to load resume"));
  }, [id]);

  const checkATS = async () => {
    if (!jobDescription.trim()) return alert("Enter Job Description!");

    setLoading(true);

    try {
      const res = await api.post(
        "/ats/check",
        { resumeText, jobDescription },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("ATS RESULT:", res.data);
      setResult(res.data);
    } catch (err) {
      console.error("FULL ERROR:", err);
      console.error("SERVER RESPONSE:", err?.response?.data);
      alert("ATS Check Failed. Open console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-12 max-w-5xl mx-auto animate-fadeIn">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
        AI-Powered ATS Score Checker
      </h1>

      <div className="p-6 rounded-3xl bg-gradient-to-r from-green-50 to-green-100 border border-green-300 shadow mb-10">
        <div className="flex items-center gap-3">
          <ClipboardDocumentCheckIcon className="w-7 text-green-700" />
          <p className="text-lg font-semibold text-green-700">
            Resume Loaded Successfully!🎉🎉
          </p>
        </div>

        <button
          onClick={() => setShowText(!showText)}
          className="mt-4 px-5 py-2 text-sm bg-gray-200 rounded-xl hover:bg-gray-300 transition"
        >
          {showText ? "Hide Extracted Text" : "Show Extracted Text"}
        </button>

        {showText && (
          <textarea
            className="w-full h-40 bg-white border p-4 rounded-xl mt-4 shadow-inner 
                       focus:ring-2 focus:ring-purple-500 outline-none"
            value={resumeText}
            readOnly
          />
        )}
      </div>

      <div className="p-6 bg-white rounded-3xl shadow-xl border border-gray-500 mb-10">
        <div className="flex items-center gap-2 mb-2">
          <DocumentTextIcon className="w-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Paste Job Description
          </h2>
        </div>

        <textarea
          className="w-full h-44 border bg-gray-50 p-4 rounded-2xl text-gray-800
                     focus:ring-2 focus:ring-purple-500 outline-none shadow-inner"
          value={jobDescription}
          placeholder="Paste the job description here..."
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <button
          onClick={checkATS}
          className="mt-5 px-7 py-3 bg-purple-600 text-white rounded-xl font-medium 
                     hover:bg-purple-700 shadow-md hover:shadow-lg transition flex items-center gap-2"
        >
          <SparklesIcon className="w-5" />
          {loading ? "Checking..." : "Check ATS Score"}
        </button>
      </div>

      {result && (
        <div className="mt-12 p-10 rounded-3xl bg-white border shadow-xl animate-fadeIn">
          <div className="flex items-center gap-10 mb-8">
            <div className="relative w-28 h-28">
              <svg width="112" height="112" className="absolute top-0 left-0">
                <circle
                  cx="56"
                  cy="56"
                  r="45"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="45"
                  stroke="#7c3aed"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 45}
                  strokeDashoffset={(1 - result.score / 100) * 2 * Math.PI * 45}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              </svg>
              <div
                className="absolute inset-0 flex items-center justify-center 
                              text-2xl font-extrabold text-purple-700"
              >
                {result.score}%
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Your ATS Compatibility Score
              </h2>
              <p className="text-gray-600 mt-1">
                Based on skill match, keywords, formatting & relevance.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-red-600 mt-6">
            Missing Skills
          </h3>
          <ul className="ml-6 mt-1 text-gray-800 list-disc">
            {result.missingSkills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold text-blue-600 mt-8">
            Suggested Improvements
          </h3>
          <ul className="ml-6 mt-1 text-gray-800 list-disc">
            {result.improvements.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <button
            onClick={() => navigate(`/tailor/${id}`)}
            className="mt-10 px-7 py-3 bg-green-600 text-white rounded-xl 
                       hover:bg-green-700 transition shadow-md hover:shadow-lg"
          >
            Tailor Resume →
          </button>
        </div>
      )}
    </div>
  );
}
