// Author: Ashish Choudhary | Section C | Full Stack Project
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (Local Compass)
connectDB();

app.get("/", (req, res) => res.send("E-Learning Platform Backend Running 🚀"));
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
