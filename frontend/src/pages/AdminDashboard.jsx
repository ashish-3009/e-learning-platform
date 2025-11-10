import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/courses").then((res) => setCourses(res.data));
  }, []);

  return (
    <div className="admin">
      <h2>Admin Dashboard</h2>
      <Link to="/admin/addcourse" className="add-btn">Add New Course</Link>
      <table>
        <thead>
          <tr><th>Title</th><th>Description</th></tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c._id}><td>{c.title}</td><td>{c.description}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
