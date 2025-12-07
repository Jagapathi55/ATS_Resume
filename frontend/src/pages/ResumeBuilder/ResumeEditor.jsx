import React, { useState, useEffect } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

import api from "../../api/axios";

import StepPersonal from "./steps/StepPersonal";
import StepSummary from "./steps/StepSummary";
import StepExperience from "./steps/StepExperience";
import StepProjects from "./steps/StepProjects";
import StepSkills from "./steps/StepSkills";
import StepEducation from "./steps/StepEducation";
import StepAchievements from "./steps/StepAchievements";
import StepFinal from "./steps/StepFinal";

import LivePreview from "./LivePreview";
import ProgressBar from "./ProgressBar";

const EMPTY_RESUME = {
  personalInfo: {},
  summary: "",
  experience: [],
  projects: [],
  education: [],
  skills: [],
  achievements: [],
  certifications: [],
  template: "minimal",
};

export default function ResumeEditor({
  initialData = null,
  externalSave = null,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedTemplate = searchParams.get("template") || "minimal";
  const isNew = !id || id === "new";

  const [resumeData, setResumeData] = useState(EMPTY_RESUME);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => Math.min(8, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const update = (key, value) => {
    setResumeData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    // ⭐ Load tailored structured resume if available
    const stored = localStorage.getItem("tailoredResume");

    if (stored) {
      try {
        const tailored = JSON.parse(stored);

        setResumeData({
          ...EMPTY_RESUME,
          ...tailored,
          template: selectedTemplate,
        });

        localStorage.removeItem("tailoredResume");
        setLoading(false);
        return;
      } catch (err) {
        console.log("Tailored resume parse error:", err);
      }
    }

    if (isNew) {
      setResumeData((prev) => ({ ...prev, template: selectedTemplate }));
      setLoading(false);
      return;
    }

    api
      .get(`/resume/${id}`)
      .then((res) => {
        if (!res.data) return navigate("/dashboard");

        const resume = res.data;

        resume.projects = resume.projects?.map((p) => ({
          ...p,
          bullets: Array.isArray(p.bullets)
            ? p.bullets.map((b) => (typeof b === "string" ? b : ""))
            : [""],
        }));

        setResumeData(resume);
        setLoading(false);
      })
      .catch(() => navigate("/dashboard"));
  }, [id, initialData]);

  const saveResume = async () => {
    if (externalSave) return externalSave(resumeData);

    try {
      if (isNew) {
        await api.post("/resume/create", resumeData);
      } else {
        await api.put(`/resume/${id}`, resumeData);
      }
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to save!");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepPersonal data={resumeData} update={update} next={next} />;
      case 2:
        return (
          <StepSummary
            data={resumeData}
            update={update}
            next={next}
            back={back}
          />
        );
      case 3:
        return (
          <StepExperience
            data={resumeData}
            update={update}
            next={next}
            back={back}
          />
        );
      case 4:
        return (
          <StepProjects
            data={resumeData}
            update={update}
            next={next}
            back={back}
          />
        );
      case 5:
        return (
          <StepSkills
            data={resumeData}
            update={update}
            next={next}
            back={back}
          />
        );
      case 6:
        return (
          <StepEducation
            data={resumeData}
            update={update}
            next={next}
            back={back}
          />
        );
      case 7:
        return (
          <StepAchievements
            data={resumeData}
            update={update}
            next={next}
            back={back}
          />
        );
      case 8:
        return (
          <StepFinal
            back={back}
            save={saveResume}
            data={resumeData}
            isNew={isNew}
          />
        );
      default:
        return null;
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-12">
      <div className="col-span-5 bg-white p-6 h-screen overflow-y-auto shadow">
        <ProgressBar step={step} onStepChange={setStep} />
        {renderStep()}
      </div>

      <div className="col-span-7 bg-gray-50 p-6 h-screen overflow-y-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <span className="font-semibold text-gray-700">
              Change Template:
            </span>

            {["minimal", "modern", "elegant"].map((t) => (
              <button
                key={t}
                onClick={() =>
                  setResumeData((prev) => ({ ...prev, template: t }))
                }
                className={`px-4 py-2 rounded-xl border ${
                  resumeData.template === t
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={saveResume}
            className="px-6 py-2 bg-green-600 text-white rounded-xl"
          >
            Save
          </button>
        </div>

        <LivePreview resume={resumeData} />
      </div>
    </div>
  );
}
