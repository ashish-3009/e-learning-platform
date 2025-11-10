import dotenv from "dotenv";
import mongoose from "mongoose";
import Course from "./models/Course.js";
import connectDB from "./config/db.js";

dotenv.config();

const seedCourses = async () => {
  try {
    console.log("🌐 Connecting to MongoDB...");
    await connectDB();

    console.log("🧹 Removing old course data...");
    await Course.deleteMany();

    const sampleCourses = [
      {
        title: "Full Stack Web Development",
        description: "Learn MERN stack from scratch with real projects.",
        instructor: "Ashish Choudhary",
        students: [],
      },
      {
        title: "Python for Data Science",
        description: "Master Python, NumPy, and Pandas to analyze data.",
        instructor: "Somesh Chutel",
        students: [],
      },
      {
        title: "Cloud Computing Basics",
        description: "Understand AWS, Azure, and modern cloud tools.",
        instructor: "Yesh Raheja",
        students: [],
      },
    ];

    const createdCourses = await Course.insertMany(sampleCourses);
    console.log("✅ Sample Courses Added Successfully!");
    console.log(createdCourses);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding courses:", err.message);
    process.exit(1);
  }
};

seedCourses();
