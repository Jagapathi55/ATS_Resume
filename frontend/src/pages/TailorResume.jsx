import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function TailorResume() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tailoredData, setTailoredData] = useState(null);

  useEffect(() => {
    api
      .get(`/resume/${id}`)
      .then((res) => setResume(res.data))
      .catch(() => toast.error("Resume load failed"));
  }, [id]);

  const tailorResume = async () => {
    setLoading(true);
    try {
      const res = await api.post("/ai/tailor-resume", {
        resumeText: resume.extractedText,
        jobDescription: state?.jobDesc,
      });

      setTailoredData(res.data);
    } catch (err) {
      toast.error("Tailoring failed!");
    }
    setLoading(false);
  };

  const chooseTemplate = (template) => {
    navigate(`/editor/new?template=${template}`, {
      state: { aiData: tailoredData },
    });
  };

  if (!resume) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold">Tailor Your Resume</h1>

      <h2 className="mt-6 font-semibold">Extracted Resume</h2>
      <div className="p-4 bg-gray-100 border rounded max-h-60 overflow-y-auto">
        {resume.extractedText}
      </div>

      <h2 className="mt-6 font-semibold">Job Description</h2>
      <div className="p-4 bg-gray-100 border rounded max-h-60 overflow-y-auto">
        {state?.jobDesc}
      </div>

      <button
        onClick={tailorResume}
        className="mt-6 px-6 py-3 bg-purple-600 text-white rounded"
        disabled={loading}
      >
        {loading ? "Tailoring..." : "Tailor Resume with AI"}
      </button>

      {tailoredData && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Choose Template</h2>

          <div className="grid grid-cols-3 gap-5 mt-5">
            <div
              className="border p-4 cursor-pointer hover:shadow-xl"
              onClick={() => chooseTemplate("minimal")}
            >
              <h3 className="font-semibold">Minimal</h3>
            </div>

            <div
              className="border p-4 cursor-pointer hover:shadow-xl"
              onClick={() => chooseTemplate("classic")}
            >
              <h3 className="font-semibold">Classic</h3>
            </div>

            <div
              className="border p-4 cursor-pointer hover:shadow-xl"
              onClick={() => chooseTemplate("modern")}
            >
              <h3 className="font-semibold">Modern</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
