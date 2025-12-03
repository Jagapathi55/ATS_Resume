import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import ResumeEditor from "../ResumeBuilder/ResumeEditor";

export default function TailorEditor() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedTemplate = searchParams.get("template") || "minimal";

  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("tailoredResume");
    if (!raw) return navigate("/dashboard");

    const tailored = JSON.parse(raw);

    setResumeData({
      ...tailored,
      template: selectedTemplate,
    });
  }, [selectedTemplate]);

  const save = async () => {
    await api.post("/resume/create", resumeData);
    localStorage.removeItem("tailoredResume");
    navigate("/dashboard");
  };

  if (!resumeData) return <>Loading...</>;

  return (
    <ResumeEditor
      key={selectedTemplate}
      initialData={resumeData}
      externalSave={save}
      isTailored={true}
    />
  );
}
