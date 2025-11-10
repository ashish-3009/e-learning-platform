import Course from "../models/Course.js";

export const seedCourses = async (req, res) => {
  try {
    const sampleCourses = [
      {
        title: "Full Stack Web Development",
        description: "Learn MERN stack from scratch with real projects.",
        instructor: "Ashish Choudhary",
        image:
          "https://www.guvi.in/blog/wp-content/uploads/2023/04/Feature-image-Best-Full-Stack-Development-Project-Ideas-for-Beginners.webp",
        students: [],
      },
      {
        title: "Python for Data Science",
        description: "Master Python, NumPy, and Pandas to analyze data.",
        instructor: "Somesh Chutel",
        image:
          "https://datascientest.com/en/files/2023/06/python-data-science-2.jpeg",
        students: [],
      },
      {
        title: "Cloud Computing Basics",
        description: "Understand AWS, Azure, and modern cloud tools.",
        instructor: "Yesh Raheja",
        image:
          "https://miro.medium.com/v2/resize:fit:1200/1*gWRwzlGrygsQfUeYRYl5PQ.jpeg",
        students: [],
      },
    ];

    // Remove any existing courses (optional, keeps things clean)
    await Course.deleteMany();

    // Insert the demo courses
    await Course.insertMany(sampleCourses);

    res.status(200).json({ message: "✅ Sample courses seeded successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Failed to seed courses", error });
  }
};
