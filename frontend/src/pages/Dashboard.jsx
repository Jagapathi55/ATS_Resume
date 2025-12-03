import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  let storedUser = localStorage.getItem("user");
  let userData = {};

  try {
    userData = storedUser ? JSON.parse(storedUser) : {};
  } catch {
    userData = {};
  }

  const fullName =
    userData.fullName ||
    userData.name ||
    userData.username ||
    userData.user?.fullName ||
    "User";

  const fetchResumes = async () => {
    try {
      const res = await api.get("/resume/my-resumes");
      setResumes(res.data);
    } catch (err) {
      console.log("Failed to load resumes");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleATSUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const resumeId = res.data.resumeId;
      navigate(`/ats-check/${resumeId}`);
    } catch (err) {
      alert("Upload failed");
      console.log(err);
    }
  };

  const deleteResume = async (id) => {
    try {
      await api.delete(`/resume/${id}`);
      setResumes((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.log("Delete failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-gray-200 mb-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-3xl font-bold shadow-md">
              {fullName.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {fullName}!
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Build, improve, and track your resumes—all in one place.
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-5">
            <span className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
              💬 Rate Us!
            </span>
            <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              🤖 AI Powered
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-2xl shadow-md text-white bg-gradient-to-r from-indigo-500 to-purple-500">
            <h2 className="text-3xl font-bold">{resumes.length}</h2>
            <p className="text-lg mt-1 opacity-90">Resumes Created</p>
          </div>
          <div className="p-6 rounded-2xl shadow-md text-white bg-gradient-to-r from-green-500 to-teal-500">
            <h2 className="text-3xl font-bold">68%</h2>
            <p className="text-lg mt-1 opacity-90">Avg ATS Score</p>
          </div>
          <div className="p-6 rounded-2xl shadow-md text-white bg-gradient-to-r from-orange-500 to-amber-500">
            <h2 className="text-3xl font-bold">3x</h2>
            <p className="text-lg mt-1 opacity-90">More Interviews</p>
          </div>
          <div className="p-6 rounded-2xl shadow-md text-white bg-gradient-to-r from-purple-500 to-fuchsia-500">
            <h2 className="text-3xl font-bold">24/7</h2>
            <p className="text-lg mt-1 opacity-90">AI Support</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-white rounded-2xl shadow border border-gray-200">
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">
            Upload Resume for ATS
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            Upload your resume (PDF/DOCX) to check ATS Score and Tailor Resume.
          </p>

          <label
            className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 
            bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-md 
            hover:shadow-lg hover:opacity-95 transition-all duration-200"
          >
            📄 Upload Resume
            <input className="hidden" onClick={() => navigate("/ats-upload")} />
          </label>
        </div>

        <div className="mt-8 p-6 bg-white rounded-2xl shadow border border-gray-200">
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">
            Create a New Resume
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            Start building a brand-new resume using our professional templates.
          </p>

          <button
            onClick={() => navigate("/templates")}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 
            text-white rounded-xl shadow-md hover:shadow-lg hover:opacity-95 transition"
          >
            Create Resume →
          </button>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="h-40 bg-gray-200 animate-pulse rounded-xl"></div>
            <div className="h-40 bg-gray-200 animate-pulse rounded-xl"></div>
          </div>
        )}

        {!loading && resumes.length === 0 && (
          <div className="text-center text-gray-500 py-20 text-lg">
            You haven’t created any resumes yet.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {resumes.map((r) => (
            <div
              key={r._id}
              className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-semibold text-gray-900">
                {r.personalInfo?.fullName || "Untitled Resume"}
              </h3>

              <p className="text-gray-500 mt-1 text-sm">
                Updated: {new Date(r.updatedAt).toLocaleDateString()}
              </p>

              <p className="text-gray-600 mt-1">
                Template: {r.template || "Default"}
              </p>

              <div className="mt-5 flex gap-4">
                <Link
                  to={`/editor/${r._id}`}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white 
                  rounded-lg hover:bg-green-700 transition"
                >
                  <PencilSquareIcon className="w-5" />
                  Edit
                </Link>

                <button
                  onClick={() => deleteResume(r._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white 
                  rounded-lg hover:bg-red-700 transition"
                >
                  <TrashIcon className="w-5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
