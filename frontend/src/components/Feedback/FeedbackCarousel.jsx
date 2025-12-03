import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function FeedbackCarousel() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    api.get("/feedback").then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    if (!data.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [data]);

  if (!data.length)
    return <p className="text-center text-gray-500 py-10">No feedback yet.</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
        What People Say ✨
      </h2>

      <div className="flex justify-center gap-6">
        {data.slice(index, index + 3).map((fb, i) => (
          <div
            key={i}
            className="bg-white border rounded-2xl p-6 w-full max-w-sm shadow-md hover:shadow-xl transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                {fb.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{fb.name}</p>
                <p className="text-yellow-500 text-sm">★ {fb.rating}/5</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700 italic">"{fb.message}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
