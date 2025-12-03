import jwt from "jsonwebtoken";

export const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

export const validation = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({ message: err.message || "Server Error" });
};
