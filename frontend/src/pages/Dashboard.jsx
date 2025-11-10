import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/global.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();
  const [totalCourses, setTotalCourses] = useState(0);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completionRate, setCompletionRate] = useState(0);
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:5000/api/courses";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: allCourses } = await axios.get(`${BASE_URL}`);
        setTotalCourses(allCourses.length);

        const { data: myCourses } = await axios.get(`${BASE_URL}/my`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setEnrolledCourses(myCourses);

        // Simulated completion %
        if (myCourses.length > 0) {
          const avgCompletion =
            myCourses.reduce(
              (sum) => sum + Math.floor(Math.random() * 60) + 20,
              0
            ) / myCourses.length;
          setCompletionRate(avgCompletion.toFixed(1));
        }
      } catch (err) {
        console.error("Error loading dashboard:", err);
      }
    };

    if (user?.token) fetchData();
  }, [user]);

  const chartData = [
    { name: "Completed", value: completionRate },
    { name: "Remaining", value: 100 - completionRate },
  ];

  const COLORS = ["#0077b6", "#90e0ef"];

  return (
    <div className="dashboard-container">
      <h1 className="page-title">📊 Dashboard</h1>

      <div className="dashboard-grid">
        {/* Stats Cards */}
        <div className="stat-card">
          <h2>{totalCourses}</h2>
          <p>Total Courses</p>
        </div>

        <div className="stat-card">
          <h2>{enrolledCourses.length}</h2>
          <p>Courses Enrolled</p>
        </div>

        <div className="stat-card">
          <h2>{completionRate}%</h2>
          <p>Average Completion</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <h3>📈 Learning Progress Overview</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={100}
              innerRadius={60}
              fill="#8884d8"
              label
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Links */}
      <div className="quick-links">
        <button onClick={() => navigate("/courses")} className="continue-btn">
          Explore Courses 🚀
        </button>
        <button onClick={() => navigate("/mycourses")} className="continue-btn">
          Go to My Courses 🎓
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
