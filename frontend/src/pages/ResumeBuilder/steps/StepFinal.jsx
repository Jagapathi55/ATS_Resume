import React from "react";
import { useParams } from "react-router-dom";
import { downloadResumePDF } from "../../../utils/downloadPDF";
import {
  CheckCircleIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

export default function StepFinal({ back, save, data, isNew, resumeId }) {
  const { id } = useParams();

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Final Step</h2>

      <div
        className="bg-white/80 backdrop-blur-xl shadow-xl border border-gray-200 
      rounded-3xl p-8 text-center space-y-6"
      >
        <CheckCircleIcon className="w-16 mx-auto text-green-500" />

        <h3 className="text-xl font-semibold text-gray-900">
          Your resume is ready!
        </h3>

        <p className="text-gray-600 max-w-md mx-auto">
          You can save your resume, update it, or download a clean PDF version.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <button
            onClick={back}
            className="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-medium 
            hover:bg-gray-300 transition"
          >
            ← Back
          </button>

          <button
            onClick={save}
            className="px-6 py-2 rounded-xl bg-green-600 text-white font-medium 
            hover:bg-green-700 transition shadow"
          >
            {isNew ? "Save Resume" : "Update Resume"}
          </button>

          <button
            onClick={downloadResumePDF}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-purple-600 
            text-white font-medium hover:bg-purple-700 transition shadow"
          >
            <ArrowDownTrayIcon className="w-5" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
