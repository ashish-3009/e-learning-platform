import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const images = {
    "Full Stack Web Development": "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
    "Python for Data Science": "https://cdn-icons-png.flaticon.com/512/3098/3098090.png",
    "Cloud Computing Basics": "https://cdn-icons-png.flaticon.com/512/4144/4144749.png",
    default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      await api.post(`/courses/${id}/enroll`, {}, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert("Enrolled successfully!");
      navigate("/mycourses");
    } catch (err) {
      alert("Enrollment failed!");
    }
  };

  if (!course) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="container">
      <div className="course-detail-card">
        <img
          src={images[course.title] || images.default}
          alt={course.title}
          className="course-detail-img"
        />
        <h2>{course.title}</h2>
        <p>{course.description}</p>
        <p><strong>Instructor:</strong> {course.instructor}</p>
        <p><strong>Students Enrolled:</strong> {course.students.length}</p>

        <button onClick={handleEnroll} className="enroll-detail-btn">
          Enroll Now
        </button>
      </div>
    </div>
  );
}
