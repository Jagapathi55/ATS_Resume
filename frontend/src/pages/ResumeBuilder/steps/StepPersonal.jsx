import React, { useState, useEffect } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function StepPersonal({ data, update, next }) {
  const [localData, setLocalData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    if (data.personalInfo) {
      setLocalData(data.personalInfo);
    }
  }, [data]);

  const handleChange = (field, value) => {
    setLocalData({ ...localData, [field]: value });
  };

  const saveAndNext = () => {
    update("personalInfo", localData);
    next();
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Personal Information
      </h2>

      <div className="bg-white/70 backdrop-blur-xl shadow-xl border border-gray-200 rounded-3xl p-6 space-y-6 transition-all">
        <div className="group">
          <label className="text-sm font-medium text-gray-500">Full Name</label>
          <div
            className="flex items-center gap-2 mt-1 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 
          focus-within:ring-2 focus-within:ring-purple-500 transition-all"
          >
            <UserIcon className="w-5 text-gray-500" />
            <input
              type="text"
              value={localData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="w-full bg-transparent outline-none text-gray-900"
              placeholder="Enter your name"
            />
          </div>
        </div>

        <div className="group">
          <label className="text-sm font-medium text-gray-500">Email</label>
          <div
            className="flex items-center gap-2 mt-1 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 
          focus-within:ring-2 focus-within:ring-purple-500 transition-all"
          >
            <EnvelopeIcon className="w-5 text-gray-500" />
            <input
              type="email"
              value={localData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full bg-transparent outline-none"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="group">
          <label className="text-sm font-medium text-gray-500">Phone</label>
          <div
            className="flex items-center gap-2 mt-1 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 
          focus-within:ring-2 focus-within:ring-purple-500 transition-all"
          >
            <PhoneIcon className="w-5 text-gray-500" />
            <input
              type="text"
              value={localData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full bg-transparent outline-none"
              placeholder="Mobile number"
            />
          </div>
        </div>

        <div className="group">
          <label className="text-sm font-medium text-gray-500">Location</label>
          <div
            className="flex items-center gap-2 mt-1 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 
          focus-within:ring-2 focus-within:ring-purple-500 transition-all"
          >
            <MapPinIcon className="w-5 text-gray-500" />
            <input
              type="text"
              value={localData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full bg-transparent outline-none"
              placeholder="City, Country"
            />
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button
            onClick={next}
            className="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
          >
            Skip →
          </button>

          <button
            onClick={saveAndNext}
            className="px-8 py-2 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 shadow-md transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
