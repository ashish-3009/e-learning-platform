import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [form, setForm] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/courses", form);
    navigate("/admin");
  };

  return (
    <div className="auth-container">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Course Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
