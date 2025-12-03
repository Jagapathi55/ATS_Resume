import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
  ClipboardDocumentListIcon,
  DocumentCheckIcon,
  EyeIcon,
  EyeSlashIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function Tailor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    api
      .get(`/resume/${id}`)
      .then((res) => setResumeText(res.data.extractedText || ""))
      .catch(() => alert("Failed to load resume"));
  }, [id]);

  const tailorResume = async () => {
    if (!jobDescription.trim()) return alert("Enter Job Description!");

    setLoading(true);
    try {
      const res = await api.post("/ats/tailor", {
        resumeText,
        jobDescription,
      });

      localStorage.setItem("tailoredResume", JSON.stringify(res.data));
      navigate(`/tailor/${id}/templates`);
    } catch (err) {
      alert("Tailor failed!");
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-10 max-w-3xl mx-auto animate-fadeIn">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 flex items-center gap-2">
        <SparklesIcon className="w-9 text-purple-600" />
        Tailor Your Resume
      </h1>

      <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 border border-green-300 rounded-3xl shadow-sm mb-10">
        <div className="flex items-center gap-2">
          <DocumentCheckIcon className="w-7 text-green-700" />
          <p className="font-semibold text-green-700 text-lg">
            Resume Loaded Successfully!!🎉🎉
          </p>
        </div>

        <button
          onClick={() => setShowText(!showText)}
          className="mt-4 px-4 py-2 text-sm bg-gray-200 rounded-xl hover:bg-gray-300 transition flex items-center gap-2"
        >
          {showText ? (
            <>
              <EyeSlashIcon className="w-4" /> Hide Extracted Text
            </>
          ) : (
            <>
              <EyeIcon className="w-4" /> Show Extracted Text
            </>
          )}
        </button>

        {showText && (
          <textarea
            className="w-full h-44 border-2 border-green-300 bg-white p-4 rounded-xl mt-4 shadow-inner focus:ring-2 focus:ring-purple-500 outline-none"
            value={resumeText}
            readOnly
          />
        )}
      </div>

      <div className="mb-10 p-6 rounded-3xl bg-white shadow-xl border-2 border-purple-300 hover:border-purple-400 transition">
        <div className="flex items-center gap-2 mb-2">
          <ClipboardDocumentListIcon className="w-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Paste Job Description
          </h2>
        </div>

        <textarea
          className="w-full h-44 border-2 border-purple-200 bg-gray-50 p-4 rounded-2xl text-gray-800 
                     focus:border-purple-500 focus:ring-2 focus:ring-purple-400 outline-none shadow-inner transition"
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      <button
        onClick={tailorResume}
        className="px-7 py-3 bg-purple-600 text-white rounded-xl font-medium 
                   hover:bg-purple-700 shadow-lg hover:shadow-xl transition flex items-center gap-2"
      >
        <SparklesIcon className="w-5" />
        {loading ? "Tailoring..." : "Tailor Resume →"}
      </button>
    </div>
  );
}
