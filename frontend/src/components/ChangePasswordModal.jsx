import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function ChangePasswordModal({ open, onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordStrength = () => {
    if (newPassword.length < 6) return "Weak";
    if (!/[A-Z]/.test(newPassword)) return "Medium";
    if (!/[0-9]/.test(newPassword)) return "Medium";
    if (!/[@$!%*?&]/.test(newPassword)) return "Medium";
    return "Strong";
  };

  const strengthColor = {
    Weak: "bg-red-500",
    Medium: "bg-yellow-500",
    Strong: "bg-green-500",
  };

  const submit = async () => {
    if (!oldPassword || !newPassword || !confirm)
      return toast.error("Fill all fields");

    if (newPassword !== confirm) return toast.error("Passwords do not match");

    try {
      await api.put("/auth/change-password", {
        oldPassword,
        newPassword,
      });

      toast.success("Password updated!");
      onClose();
      setOldPassword("");
      setNewPassword("");
      setConfirm("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update");
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50
        ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
        transition-all duration-300`}
    >
      <div className="bg-white/90 w-full max-w-md p-8 rounded-3xl shadow-2xl animate-scaleUp">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Change Password 🔐
        </h2>

        <p className="text-gray-500 text-center mb-6">
          Keep your account safe and secure.
        </p>

        <div className="relative mb-4">
          <input
            type={showOld ? "text" : "password"}
            className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <span
            onClick={() => setShowOld(!showOld)}
            className="absolute right-4 top-3 cursor-pointer text-gray-500"
          >
            {showOld ? "🙈" : "👁️"}
          </span>
        </div>

        <div className="relative mb-2">
          <input
            type={showNew ? "text" : "password"}
            className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span
            onClick={() => setShowNew(!showNew)}
            className="absolute right-4 top-3 cursor-pointer text-gray-500"
          >
            {showNew ? "🙈" : "👁️"}
          </span>
        </div>

        {newPassword && (
          <div className="w-full h-2 rounded-full mb-4 bg-gray-200">
            <div
              className={`h-full rounded-full ${
                strengthColor[passwordStrength()]
              }`}
              style={{
                width:
                  passwordStrength() === "Weak"
                    ? "33%"
                    : passwordStrength() === "Medium"
                    ? "66%"
                    : "100%",
              }}
            ></div>
          </div>
        )}

        <div className="relative mb-4">
          <input
            type={showConfirm ? "text" : "password"}
            className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Confirm New Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <span
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 top-3 cursor-pointer text-gray-500"
          >
            {showConfirm ? "🙈" : "👁️"}
          </span>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-5 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-6 py-2.5 rounded-xl text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90"
            onClick={submit}
          >
            Update 🔐
          </button>
        </div>
      </div>
    </div>
  );
}
