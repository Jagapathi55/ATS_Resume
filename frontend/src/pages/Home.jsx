import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeedbackCarousel from "../components/Feedback/FeedbackCarousel";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <section className="flex flex-col items-center text-center px-6 py-24">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 max-w-4xl leading-tight">
          Build a Professional, ATS-Friendly Resume in Minutes
          <span className="block text-blue-600 mt-2">with SmartResume AI</span>
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mt-6">
          Generate summaries, skills, achievements, and full resumes using AI.
          Choose from modern templates and optimize your resume for Applicant
          Tracking Systems.
        </p>

        <div className="mt-10 flex space-x-4">
          <Link
            to="/register"
            className="px-8 py-3 bg-blue-600 text-white rounded-xl text-lg shadow-lg hover:bg-blue-700 transition"
          >
            Get Started Free
          </Link>

          <Link
            to="/login"
            className="px-8 py-3 bg-white border border-gray-300 text-gray-900 rounded-xl text-lg hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>
      </section>

      <section className="px-6 py-20 bg-white">
        <h2 className="text-4xl font-bold text-center text-gray-900">
          Why SmartResume AI?
        </h2>

        <p className="text-center text-gray-600 mt-3 max-w-2xl mx-auto">
          Powerful AI tools built to help you create a job-winning resume.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mt-16">
          <div className="p-8 bg-gray-50 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              AI Writer
            </h3>
            <p className="text-gray-600">
              Generate professional summaries, bullet points, and skills
              instantly.
            </p>
          </div>

          <div className="p-8 bg-gray-50 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              ATS Score
            </h3>
            <p className="text-gray-600">
              Improve your resume's ATS score and keyword match.
            </p>
          </div>

          <div className="p-8 bg-gray-50 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Modern Templates
            </h3>
            <p className="text-gray-600">
              Pick from clean, professional templates designed to impress.
            </p>
          </div>
        </div>
      </section>

      <FeedbackCarousel />

      <section className="px-6 py-20 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          Ready to Build Your Resume?
        </h2>

        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Join thousands of job seekers landing interviews with AI-generated
          resumes.
        </p>

        <Link
          to="/register"
          className="inline-block mt-8 px-10 py-3.5 bg-blue-600 text-white rounded-xl text-lg shadow-lg hover:bg-blue-700 transition"
        >
          Start Creating
        </Link>
      </section>
    </div>
  );
}
