import React from "react";

const CourseCard = ({ course }) => (
  <div className="course-card">
    <img src={course.image || "/default-course.jpg"} alt={course.title} />
    <h3>{course.title}</h3>
    <p>{course.description}</p>
  </div>
);

export default CourseCard;
