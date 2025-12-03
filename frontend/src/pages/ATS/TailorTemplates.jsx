import { useNavigate, useParams } from "react-router-dom";
import {
  SparklesIcon,
  BriefcaseIcon,
  StarIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

export default function TailorTemplates() {
  const navigate = useNavigate();
  const { id } = useParams();

  const templates = [
    {
      id: "minimal",
      label: "Minimal Template",
      tag: "ATS Friendly",
      score: "97%",
      description: "Clean layout suitable for all industries.",
      tags: ["Clean Layout", "ATS Optimized", "Universal", "Minimalist"],
      icon: BriefcaseIcon,
    },
    {
      id: "modern",
      label: "Modern Template",
      tag: "Most Popular",
      score: "98%",
      description: "Bold and modern design for professional roles.",
      tags: ["Modern", "Professional", "Clean", "Keyword Friendly"],
      icon: StarIcon,
    },
    {
      id: "elegant",
      label: "Elegant Template",
      tag: "Premium Look",
      score: "96%",
      description: "Elegant layout with soft modern elements.",
      tags: ["Elegant", "ATS Ready", "Soft Design", "Premium"],
      icon: CodeBracketIcon,
    },
  ];

  return (
    <div className="min-h-screen px-10 py-16 bg-gray-50 animate-fadeIn">
      <h1 className="text-4xl font-extrabold mb-4 flex items-center gap-2 text-gray-900">
        <SparklesIcon className="w-9 text-purple-600" />
        Choose Template for Your Tailored Resume
      </h1>

      <p className="text-gray-600 text-lg mb-12">
        Your tailored resume will be auto-applied to the selected template.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {templates.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.id}
              className="group cursor-pointer"
              onClick={() => navigate(`/tailor/${id}/editor?template=${t.id}`)}
            >
              <div
                className="bg-white/80 border border-gray-200 rounded-3xl shadow-md p-6 
                hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative"
              >
                <span className="absolute top-4 right-4 bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full">
                  {t.tag}
                </span>

                <div className="w-14 h-14 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto">
                  <Icon className="w-7" />
                </div>

                <h2 className="mt-4 text-center text-xl font-semibold text-gray-900">
                  {t.label}
                </h2>

                <p className="mt-2 text-center text-gray-600 text-sm">
                  {t.description}
                </p>

                <p className="mt-4 text-center text-sm font-semibold">
                  ATS Score:{" "}
                  <span className="text-green-600 font-bold">{t.score}</span>
                </p>

                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {t.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  className="mt-6 w-full py-2 rounded-xl bg-gradient-to-r 
                  from-purple-600 to-indigo-600 text-white shadow-md hover:shadow-lg transition"
                >
                  Use Template →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
