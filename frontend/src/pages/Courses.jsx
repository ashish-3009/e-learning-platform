import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/global.css";

function Courses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "http://localhost:5000/api/courses";

  // 🟢 Fetch all courses
  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(BASE_URL);
      setCourses(data);
    } catch (error) {
      console.error("❌ Error loading courses:", error);
    }
  };

  // 🟢 Fetch user’s enrolled courses
  const fetchEnrolled = async () => {
    if (!user?.token) return;
    try {
      const { data } = await axios.get(`${BASE_URL}/my`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setEnrolledCourses(data.map((c) => c._id));
    } catch (error) {
      console.error("❌ Error loading enrolled:", error);
    }
  };

  // 🟢 Enroll in a course
  const handleEnroll = async (courseId) => {
    if (!user?.token) {
      alert("Please log in first to enroll.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${BASE_URL}/${courseId}/enroll`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert("✅ Enrolled successfully!");
      await fetchEnrolled();
    } catch (error) {
      console.error("❌ Enroll error:", error);
      alert(
        error.response?.data?.message ||
          "Enrollment failed! Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Unenroll from a course
  const handleUnenroll = async (courseId) => {
    if (!user?.token) {
      alert("Please log in first.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${BASE_URL}/${courseId}/unenroll`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert("🟡 Unenrolled successfully!");
      await fetchEnrolled();
    } catch (error) {
      console.error("❌ Unenroll error:", error);
      alert(
        error.response?.data?.message ||
          "Unenrollment failed! Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch courses + enrolled list on load
  useEffect(() => {
    fetchCourses();
    fetchEnrolled();
  }, [user]);

  return (
    <div className="course-container">
      <h1 className="page-title">📚 Available Courses</h1>

      {courses.length === 0 ? (
        <p>No courses available right now.</p>
      ) : (
        <div className="course-grid">
          {courses.map((course) => {
            const isEnrolled = enrolledCourses.includes(course._id);
            return (
              <div className="course-card" key={course._id}>
                <img
                  src={
                    course.title.includes("Full Stack")
                      ? "https://www.bdtask.com/blog/uploads/how-to-be-a-full-stack-developer.jpg"
                      : course.title.includes("Python")
                      ? "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
                      : "https://cdn-icons-png.flaticon.com/512/919/919853.png"
                  }
                  alt={course.title}
                  className="course-image"
                />
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p>
                  <strong>Instructor:</strong> {course.instructor}
                </p>
                {isEnrolled ? (
                  <button
                    onClick={() => handleUnenroll(course._id)}
                    className="unenroll-btn"
                    disabled={loading}
                  >
                    ✅ Enrolled (Click to Unenroll)
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="enroll-btn"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Enroll Now"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Courses;
