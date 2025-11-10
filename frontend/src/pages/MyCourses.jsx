import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/global.css";

function MyCourses() {
  const { user } = useAuth();
  const [myCourses, setMyCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); // for modal

  const BASE_URL = "http://localhost:5000/api/courses";

  // Fetch enrolled courses
  const fetchMyCourses = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/my`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setMyCourses(data);
    } catch (error) {
      console.error("Error fetching user courses:", error);
    }
  };

  // Unenroll
  const handleUnenroll = async (courseId) => {
    try {
      await axios.post(
        `${BASE_URL}/${courseId}/unenroll`,
        {},
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      alert("Unenrolled successfully!");
      fetchMyCourses();
    } catch (error) {
      alert("Failed to unenroll!");
      console.error("Unenroll error:", error);
    }
  };

  useEffect(() => {
    if (user?.token) fetchMyCourses();
  }, [user]);

  const openModal = (course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  const markAsCompleted = () => {
    alert(`🎉 You have completed "${selectedCourse.title}"!`);
    closeModal();
  };

  return (
    <div className="course-container">
      <h1 className="page-title">🎓 My Courses</h1>

      {myCourses.length === 0 ? (
        <p>You haven't enrolled in any courses yet.</p>
      ) : (
        <div className="course-grid">
          {myCourses.map((course) => {
            const progress = Math.floor(Math.random() * 70) + 20;

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

                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="progress-text">{progress}% Complete</p>

                <div className="course-actions">
                  <button
                    className="continue-btn"
                    onClick={() => openModal({ ...course, progress })}
                  >
                    Continue Learning 
                  </button>
                  <button
                    className="unenroll-btn"
                    onClick={() => handleUnenroll(course._id)}
                  >
                    Unenroll
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 🟢 MODAL for Course Details */}
      {selectedCourse && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // prevent overlay click
          >
            <h2>{selectedCourse.title}</h2>
            <p>
              <strong>Instructor:</strong> {selectedCourse.instructor}
            </p>
            <p>
              <strong>Duration:</strong> {Math.floor(Math.random() * 5) + 3} weeks
            </p>
            <p>
              <strong>Start Date:</strong> {new Date().toLocaleDateString()}
            </p>
            <p style={{ marginTop: "10px" }}>{selectedCourse.description}</p>

            <div className="progress-container">
              <div
                className="progress-bar"
                style={{ width: `${selectedCourse.progress}%` }}
              ></div>
            </div>
            <p className="progress-text">
              {selectedCourse.progress}% completed
            </p>

            <div className="modal-actions">
              <button className="continue-btn" onClick={markAsCompleted}>
                Mark as Completed ✅
              </button>
              <button className="unenroll-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCourses;
