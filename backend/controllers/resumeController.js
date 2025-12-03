import Resume from "../models/resumeModel.js";

export const createResume = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload._id) delete payload._id;

    if (payload.personal && !payload.personalInfo) {
      payload.personalInfo = payload.personal;
      delete payload.personal;
    }

    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    payload.userId = userId;

    const resume = new Resume(payload);
    await resume.save();

    return res.json({
      message: "Resume Created",
      id: resume._id,
      resume: resume,
    });
  } catch (error) {
    console.error("❌ createResume:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateResume = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload._id) delete payload._id;

    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true }
    );

    return res.json({
      message: "Resume Updated",
      id: updatedResume._id,
      resume: updatedResume,
    });
  } catch (error) {
    console.error("❌ updateResume:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: "Resume Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
