# E-Learning Platform
Author: **Ashish Choudhary | Section C**
PRN:23070521208
---

## 📘 Description

This is a fully functional **E-Learning Platform** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
It enables users to **browse courses, enroll/un-enroll**, and track learning progress — all with clean, modern UI and responsive design.

The project connects to a **local MongoDB Compass** database, making it easy to set up and run offline.

---

## 🚀 Features

- **User Authentication** — Secure login/signup using JWT.
- **Course Management** — View all courses, enroll, or un-enroll.
- **My Courses Dashboard** — Displays user-enrolled courses with progress bars.
- **Progress Tracking** — View learning completion status.
- **Responsive UI** — Works across all devices (desktop, tablet, and mobile).
- **Seeding Support** — Quickly populate demo courses in any local MongoDB Compass setup.

---

## 🧩 Technologies Used

### 🖥️ Frontend
- React.js (with React Router)
- Axios for API calls
- Vite (for faster build and hot reload)

### ⚙️ Backend
- Node.js & Express.js
- MongoDB (Local Compass)
- Mongoose (ODM)
- JWT Authentication
- CORS Middleware
- dotenv for environment variables

---

## Project Structure

The project is divided into two main parts: the backend and the frontend.

### Backend

The backend is built using Node.js and Express. It handles user authentication, course management, and data storage.

- **`/backend`**: Contains all backend-related files.
  - **`/config`**: Configuration files for database and third-party services.
  - **`/controllers`**: Logic for handling requests and responses.
  - **`/middleware`**: Middleware functions for authentication and file uploads.
  - **`/models`**: Database models for users, courses, lessons, progress, and quizzes.
  - **`/routes`**: API routes for authentication, courses, lessons, and quizzes.
  - **`/utils`**: Utility functions for token generation and email services.

### Frontend

The frontend is built using React and Vite. It provides an attractive UI/UX for users to interact with the platform.

- **`/frontend`**: Contains all frontend-related files.
  - **`/components`**: Reusable components for the application.
  - **`/pages`**: Different pages of the application.
  - **`/services`**: API service files for making requests.
  - **`/hooks`**: Custom hooks for managing state.
  - **`/context`**: Context API for global state management.
  - **`/styles`**: CSS styles and theme settings.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/ashish-3009/e-learning-platform.git
   ```

2. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```

3. Navigate to the frontend directory and install dependencies:
   ```
   cd frontend
   npm install
   ```

4. Connect MongoDB Compass
   ```
   Open MongoDB Compass and ensure your local database is running on:

    mongodb://127.0.0.1:27017/elearningDB

   ```

5. Run Backend Server:
   ```
   npm run dev

   Backend will run on:
   👉 http://localhost:5000
   ```

6. Install Frontend Dependencies:
   ```
   npm run dev
   
   Frontend will run on:
   👉 http://localhost:5173
   ```



### Course Seeding Instructions

- To make setup easy for anyone:
   After starting your backend, simply open this URL in the browser once:

   - http://localhost:5000/api/courses/seed
   

   This automatically adds 3 sample demo courses into your local MongoDB Compass:

   1. Full Stack Web Development — by Ashish Choudhary

   2. Python for Data Science — by Somesh Chutel

   3. Cloud Computing Basics — by Yesh Raheja

   After this, open the frontend → Courses section,and you’ll see all seeded courses available for enrollment

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Developed By
Ashish Choudhary
Full Stack Developer | Software Engineering Project (Section C)
PRN: 23070521208
