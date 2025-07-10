import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import SignupPage from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import UserRoute from "./pages/User/UserRoute";
import UserDashboard from "./pages/UserDashboard";
import MainDashboard from './pages/MainDashboard'
import Home from "./pages/Home";
import Navigation from "./pages/Navigation";
import AdminRoute from "./pages/admin/AdminRoute";
import ProjectList from "./pages/admin/ProjectList";
import UserList from "./pages/admin/UserList";
import Profile from "./pages/User/Profile";
import ProjectDetail from "./pages/admin/ProjectDetail";
import ModuleDetail from "./pages/admin/ModuleDetail";
import TaskDetails from "./pages/User/TaskDetails";
import TeamList from "./pages/admin/TeamList";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Navigation />
        <Routes>
          {/* Routes for EveryOne */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<MainDashboard />} />

          {/* User Routes */}
          <Route path="/user" element={<UserRoute />}>
            <Route path="dashboard" element={<UserDashboard />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="usersList" element={<UserList />} />
            <Route path="teamList" element={<TeamList />} />
            {/* <Route path="/admin/users/edit/:id" element={<UpdateUserModal />} /> */}
            <Route path="projectsList" element={<ProjectList />} />
            <Route path="projectsList/:projectId" element={<ProjectDetail />} />
            <Route
              path="projectsList/:projectId/:moduleId"
              element={<ModuleDetail />}
            />
            <Route
              path="projectsList/:projectId/:moduleId/:taskId"
              element={<TaskDetails />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
