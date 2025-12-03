import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    personalInfo: {
      fullName: String,
      email: String,
      phone: String,
      address: String,
      website: String,
      linkedin: String,
      github: String,
    },

    education: [
      {
        school: String,
        degree: String,
        startYear: String,
        endYear: String,
      },
    ],

    experience: [
      {
        role: String,
        company: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],

    projects: [
      {
        title: String,
        tech: String,
        description: String,
        bullets: [String],
      },
    ],

    skills: [String],
    certifications: [String],
    achievements: [String],

    template: {
      type: String,
      default: "minimal",
    },

    atsScore: {
      type: Number,
      default: 0,
    },

    extractedText: {
      type: String,
      default: "",
    },
    isTailored: {
      type: Boolean,
      default: false,
    },
    tailoredFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
