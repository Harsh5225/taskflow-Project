# TaskFlow 🚀

TaskFlow is a modern, high-performance project management and task tracking application built with the MERN stack. Designed with a stunning "Deep Space" aesthetic, it offers real-time synchronization, comprehensive analytics, and seamless team collaboration tools in a single unified workspace.

## ✨ Key Features

- **Kanban Task Board**: Intuitive drag-and-drop style organization. Organize tasks by `To Do`, `In Progress`, and `Done`.
- **Advanced Project Analytics**: Real-time insights into project health, total tasks, overdue tasks, and completion rates with Recharts.
- **Role-Based Access Control**: Secure team management. Only project administrators can delete tasks, ensuring data integrity.
- **Optimistic UI Updates**: Instantaneous frontend responses for task status updates, providing lightning-fast UX without waiting for server responses.
- **Premium "Deep Space" UI**: A dark-themed, glassmorphism-inspired user interface offering a stunning visual experience.

## 🛠️ Technology Stack

- **Frontend**: React (via Vite), Tailwind CSS, Redux Toolkit, Recharts, Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs

---

## 📚 API Documentation

The backend exposes a comprehensive RESTful API. All routes (except auth) require a valid JWT token in the `Authorization: Bearer <token>` header.

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint | Description | Body / Payload | Returns |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new user | `{ name, email, password }` | `{ _id, name, email, token }` |
| **POST** | `/api/auth/login` | Authenticate user & get token | `{ email, password }` | `{ _id, name, email, token }` |

### 📁 Projects (`/api/projects`) - *Protected Routes*

| Method | Endpoint | Description | Body / Payload | Returns |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/projects` | Get all projects for logged-in user | None | List of projects with populated members/admin |
| **POST** | `/api/projects` | Create a new project | `{ name, description }` | Created project object |
| **PUT** | `/api/projects/:id/members` | Add a member by email (Admin only) | `{ email }` | Updated project object |
| **DELETE**| `/api/projects/:id/members/:userId` | Remove a member (Admin only) | None | Success confirmation |

### 📋 Tasks (`/api/tasks`) - *Protected Routes*

| Method | Endpoint | Description | Body / Payload | Returns |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks/project/:projectId` | Get all tasks for a specific project | None | List of tasks with populated assigned users |
| **GET** | `/api/tasks/dashboard/:projectId`| Get analytics stats for a project | None | `{ totalTasks, tasksByStatus, overdueTasks }` |
| **POST** | `/api/tasks` | Create a new task (Admin only) | `{ title, description, dueDate, priority, project, assignedTo }` | Created task object |
| **PUT** | `/api/tasks/:id` | Update a task (Members can update status, Admin can update all fields) | `{ title, status, priority, etc. }` | Updated task object |
| **DELETE**| `/api/tasks/:id` | Delete a task (Admin only) | None | Success confirmation |

---

## 📖 Application Flow & Architecture

TaskFlow uses a highly decoupled component architecture. 
1. **Authentication**: Users register/log in to receive an encrypted JWT which protects subsequent API calls. The frontend stores this token in localStorage and attaches it to Axios interceptors.
2. **Projects**: A user creates a project, becoming its `Admin`. They can invite other members by their registered email address.
3. **Tasks**: Within a project, any member can view tasks and move them between statuses. However, Admin privileges are strictly enforced on backend routes for actions like creating or deleting tasks.
4. **State Management**: The React frontend uses Redux Toolkit to manage authentication state and project/task data.

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js (v20+ recommended)
- MongoDB running locally or a MongoDB Atlas URI

### 1. Clone the repository
```bash
git clone https://github.com/Harsh5225/taskflow-Project.git
cd taskflow-Project
```

### 2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Variables

Create `.env` in the **`backend`** folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

Create `.env` in the **`frontend`** folder:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Run the application
```bash
# Terminal 1: Start the backend
cd backend
npm run dev

# Terminal 2: Start the frontend
cd frontend
npm run dev
```
Navigate to `http://localhost:5173` to view the application!

---

## ☁️ Deployment

TaskFlow is configured for distributed deployment:
- **Frontend**: Deployed on Vercel. Vite automatically builds the React app, and the `VITE_API_URL` environment variable is used to connect to the backend.
- **Backend**: Deployed on Railway. The Express server provides the REST API and connects to a MongoDB Atlas cluster. CORS is configured to accept requests from the Vercel frontend.

*Developed with focus on beautiful UI, responsive UX, and robust code architecture.*
