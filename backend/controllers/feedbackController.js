import Feedback from "../models/Feedback.js";

export const createOrUpdateFeedback = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, message, name } = req.body;

    let fb = await Feedback.findOne({ userId });

    if (fb) {
      fb.rating = rating;
      fb.message = message;
      fb.name = name;
      fb.updatedAt = new Date();
      await fb.save();
      return res.json({ success: true, updated: true, fb });
    }

    fb = await Feedback.create({
      userId,
      name,
      rating,
      message,
    });

    res.json({ success: true, created: true, fb });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const list = await Feedback.find().sort({ updatedAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json([]);
  }
};

export const getMyFeedback = async (req, res) => {
  try {
    const fb = await Feedback.findOne({ userId: req.user.id });
    res.json(fb);
  } catch (err) {
    res.status(500).json(null);
  }
};
