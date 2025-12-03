import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function AtsUpload() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return alert("Please upload a file!");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const resumeId = res.data.resumeId;
      navigate(`/ats-check/${resumeId}`);
    } catch (err) {
      alert("Failed to upload");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = () => setDragActive(false);

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Upload Resume for ATS
        </h2>

        <div
          className={`p-10 border-2 border-dashed rounded-2xl text-center transition-all cursor-pointer 
            ${
              dragActive
                ? "border-purple-600 bg-purple-50"
                : "border-gray-300 bg-gray-50"
            }`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => document.getElementById("filePicker").click()}
        >
          <svg
            className="w-14 h-14 mx-auto text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M24 4v30m0 0l-10-10m10 10l10-10M4 44h40"
            />
          </svg>

          <p className="text-gray-700 font-medium mt-3">
            Drag & Drop your resume here
          </p>
          <p className="text-gray-500 text-sm">OR click to browse</p>

          <input
            id="filePicker"
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {file && (
          <div className="mt-5 bg-gray-100 border border-gray-300 p-3 rounded-xl flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">{file.name}</p>
              <p className="text-gray-500 text-xs">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>

            <button
              className="text-red-600 font-bold text-lg"
              onClick={() => setFile(null)}
            >
              ×
            </button>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full py-3 mt-6 rounded-xl text-white text-lg font-semibold shadow-md transition 
            ${
              file
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          {loading ? "Uploading..." : "Upload & Continue →"}
        </button>

        <p className="text-center text-gray-400 text-xs mt-4">
          Supported formats: PDF, DOC, DOCX • Max size 5MB
        </p>
      </div>
    </div>
  );
}
