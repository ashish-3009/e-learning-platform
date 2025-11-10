import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import "../styles/global.css";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home-hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>
          Welcome to <span>E-Learning Platform</span>
        </h1>
        <p>
          Learn anywhere, anytime — master new skills and accelerate your career!
        </p>

        {!user ? (
          <div className="hero-buttons">
            <Link to="/login" className="btn-primary">
              Login
            </Link>
            <Link to="/signup" className="btn-secondary">
              Signup
            </Link>
          </div>
        ) : (
          <div className="hero-buttons">
            <Link to="/courses" className="btn-primary">
              Explore Courses 📘
            </Link>
            <Link to="/dashboard" className="btn-secondary">
              Go to Dashboard 📊
            </Link>
          </div>
        )}
      </motion.div>

      {/* Floating illustration */}
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/2920/2920244.png"
        alt="Learning Illustration"
        className="hero-illustration"
        initial={{ y: 10 }}
        animate={{ y: -10 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 3,
          ease: "easeInOut",
        }}
      />

      {/* Feature Section */}
      <div className="feature-section">
        {[
          {
            title: "Learn",
            desc: "Access top-quality courses taught by industry experts.",
            icon: "📘",
          },
          {
            title: "Grow",
            desc: "Upskill at your own pace and level up your expertise.",
            icon: "🚀",
          },
          {
            title: "Achieve",
            desc: "Earn certificates and stand out in your career journey.",
            icon: "🏆",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
