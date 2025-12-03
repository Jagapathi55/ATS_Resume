import { useState, useEffect } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function FeedbackModal({ open, onClose, user }) {
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (!open) return;

    // Load user's previous feedback
    api.get("/feedback/me").then((res) => {
      if (res.data) {
        setRating(res.data.rating);
        setMessage(res.data.message);
        setIsEdit(true);
      } else {
        setRating(5);
        setMessage("");
        setIsEdit(false);
      }
    });
  }, [open]);

  const submit = async () => {
    if (!message.trim()) return alert("Please write feedback");

    await api.post("/feedback", {
      name: user.name,
      rating,
      message,
    });

    toast.success(isEdit ? "Feedback updated!" : "Thanks for your feedback!");
    onClose();
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
      <div className="bg-white/90 w-full max-w-md p-8 rounded-3xl shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          {isEdit ? "Update Your Feedback ✏️" : "We Value Your Feedback ✨"}
        </h2>

        <p className="text-gray-500 text-center mb-6">
          Hi {user.name.split(" ")[0]} —{" "}
          {isEdit ? "edit your thoughts!" : "share your experience!"}
        </p>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              onClick={() => setRating(n)}
              className={`cursor-pointer text-3xl ${
                n <= rating ? "text-yellow-400" : "text-gray-300"
              } transition transform`}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          className="w-full h-32 p-4 rounded-2xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-purple-500"
          placeholder="Leave your feedback..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

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
            {isEdit ? "Update Feedback" : "Submit Feedback"} 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
