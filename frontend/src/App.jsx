import { Routes, Route } from "react-router-dom";
import { useState, useContext } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import TemplateSelect from "./pages/ResumeBuilder/TemplateSelect";
import ResumeEditor from "./pages/ResumeBuilder/ResumeEditor";

import AtsUpload from "./pages/ATS/AtsUpload";
import AtsCheck from "./pages/ATS/AtsCheck";
import Tailor from "./pages/ATS/Tailor";
import TailorTemplates from "./pages/ATS/TailorTemplates";
import TailorEditor from "./pages/ATS/TailorEditor";

import FloatingFeedbackButton from "./components/Feedback/FloatingFeedbackButton";
import FeedbackModal from "./components/Feedback/FeedbackModal";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";

import { AuthContext } from "./context/AuthContext";

export default function App() {
  const [showFeedback, setShowFeedback] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />

      <Toaster
        position="top-center"
        toastOptions={{ style: { marginTop: 80 } }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <TemplateSelect />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editor/new"
          element={
            <ProtectedRoute>
              <ResumeEditor key="new" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editor/:id"
          element={
            <ProtectedRoute>
              <ResumeEditor key="edit" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ats-upload"
          element={
            <ProtectedRoute>
              <AtsUpload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ats-check/:id"
          element={
            <ProtectedRoute>
              <AtsCheck />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tailor/:id"
          element={
            <ProtectedRoute>
              <Tailor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tailor/:id/templates"
          element={
            <ProtectedRoute>
              <TailorTemplates />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tailor/:id/editor"
          element={
            <ProtectedRoute>
              <TailorEditor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />

      {user && (
        <>
          <FloatingFeedbackButton onOpen={() => setShowFeedback(true)} />

          <FeedbackModal
            open={showFeedback}
            onClose={() => setShowFeedback(false)}
            user={user}
          />
        </>
      )}
    </>
  );
}
