import Course from "../models/Course.js";
import User from "../models/User.js";

// 🟢 Get all available courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    res.status(500).json({ message: "Failed to load courses" });
  }
};

// 🟢 Enroll in a course
export const enrollCourse = async (req, res) => {
  try {
    // Check if req.user exists (from token)
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized - user not found" });
    }

    const userId = req.user._id;
    const courseId = req.params.id;

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if already enrolled
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    // Enroll logic
    user.enrolledCourses.push(courseId);
    course.students.push(userId);

    await user.save();
    await course.save();

    console.log(`✅ ${user.name} enrolled in ${course.title}`);
    res.status(200).json({ message: "Enrolled successfully", courseId });
  } catch (error) {
    console.error("❌ Error enrolling:", error);
    res.status(500).json({ message: "Enrollment failed" });
  }
};

// 🟢 Unenroll from a course
export const unenrollCourse = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized - user not found" });
    }

    const userId = req.user._id;
    const courseId = req.params.id;

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Remove references
    user.enrolledCourses = user.enrolledCourses.filter(
      (id) => id.toString() !== courseId.toString()
    );
    course.students = course.students.filter(
      (id) => id.toString() !== userId.toString()
    );

    await user.save();
    await course.save();

    console.log(`🟡 ${user.name} unenrolled from ${course.title}`);
    res.status(200).json({ message: "Unenrolled successfully", courseId });
  } catch (error) {
    console.error("❌ Error unenrolling:", error);
    res.status(500).json({ message: "Unenrollment failed" });
  }
};

// 🟢 Get user’s enrolled courses
export const getMyCourses = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized - user not found" });
    }

    const user = await User.findById(req.user._id).populate("enrolledCourses");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.enrolledCourses);
  } catch (error) {
    console.error("❌ Error fetching user courses:", error);
    res.status(500).json({ message: "Error fetching user courses" });
  }
};
