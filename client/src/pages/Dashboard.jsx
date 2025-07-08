import { useState, useEffect } from "react";
import {
  FolderOpen,
  Users,
  CheckSquare,
  Settings,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Target,
  ScrollText,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [userRoles, setUserRoles] = useState([]);
  const [dataInfo, setDataInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({});

  const { userInfo } = useSelector((state) => state.auth);

  // Mock API call to fetch user roles and data
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);

      // Simulate API call
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock response - replace with actual API call
        const mockUserData = {
          user: {
            id: 1,
            name: "John Doe",
            email: "john@company.com",
            avatar: null,
          },
          roles: ["admin", "project_manager"], // Dynamic roles from server
          dashboardData: {
            totalProjects: 12,
            activeModules: 34,
            pendingTasks: 87,
            completedTasks: 156,
            teamMembers: 25,
            recentActivity: [
              {
                id: 1,
                action: "Project 'E-Commerce App' created",
                time: "2 hours ago",
                type: "project",
              },
              {
                id: 2,
                action: "Task 'API Integration' completed",
                time: "4 hours ago",
                type: "task",
              },
              {
                id: 3,
                action: "New team member added",
                time: "1 day ago",
                type: "user",
              },
            ],
            upcomingDeadlines: [
              {
                id: 1,
                title: "Mobile App Module",
                deadline: "2024-06-15",
                project: "E-Commerce App",
              },
              {
                id: 2,
                title: "Database Design",
                deadline: "2024-06-18",
                project: "CRM System",
              },
            ],
          },
        };
        setUserRoles(mockUserData.roles);
        setDataInfo(mockUserData.user);
        setDashboardData(mockUserData.dashboardData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // useEffect(() => {}, [userInfo]);

  // Helper function to check if user has specific role
  const hasRole = (role) => userRoles.includes(role);

  // Helper function to check if user has any of the specified roles
  const hasAnyRole = (roles) => roles.some((role) => userRoles.includes(role));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {userInfo.name}!
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your projects today.
          </p>
        </div>

        {/* Admin-only Quick Actions */}
        {userInfo.isAdmin === true && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">
                Admin Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button className="bg-white/20 hover:bg-white/30 rounded-lg p-3 transition-colors">
                  <ScrollText className="w-5 h-5 mb-2 " />
                  <span className="text-sm font-medium">
                    <Link to="/admin/projectsList">Manage Project</Link>
                  </span>
                </button>
                <button className="bg-white/20 hover:bg-white/30 rounded-lg p-3 transition-colors">
                  <Users className="w-5 h-5 mb-2 " />
                  <span className="text-sm font-medium">
                    <Link to="/admin/usersList">Manage Users</Link>
                  </span>
                </button>
                <button className="bg-white/20 hover:bg-white/30 rounded-lg p-3 transition-colors">
                  <Settings className="w-5 h-5 mb-2 " />
                  <span className="text-sm font-medium">
                    <Link to="/admin/teamList">Manage Teams</Link>
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards - Visible to admin and project_manager */}
        {hasAnyRole(["admin", "project_manager"]) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Projects
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.totalProjects}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Modules
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.activeModules}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending Tasks
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.pendingTasks}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Completed Tasks
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.completedTasks}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity - Visible to all roles */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {dashboardData.recentActivity?.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.type === "project"
                        ? "bg-blue-100"
                        : activity.type === "task"
                          ? "bg-green-100"
                          : "bg-purple-100"
                      }`}
                  >
                    {activity.type === "project" && (
                      <FolderOpen className="w-4 h-4 text-blue-600" />
                    )}
                    {activity.type === "task" && (
                      <CheckSquare className="w-4 h-4 text-green-600" />
                    )}
                    {activity.type === "user" && (
                      <Users className="w-4 h-4 text-purple-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines - Visible to admin, project_manager, and team_leader */}
          {hasAnyRole(["admin", "project_manager", "team_leader"]) && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Upcoming Deadlines
              </h3>
              <div className="space-y-4">
                {dashboardData.upcomingDeadlines?.map((deadline) => (
                  <div
                    key={deadline.id}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {deadline.title}
                      </p>
                      <p className="text-xs text-gray-600">
                        {deadline.project}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-600">
                        {deadline.deadline}
                      </p>
                      <div className="flex items-center text-xs text-red-500">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Urgent
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team Members - Admin only */}
          {hasRole("admin") && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Team Overview
              </h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Total Team Members
                    </p>
                    <p className="text-xs text-gray-600">
                      Active across all projects
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.teamMembers}
                  </p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% this month
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* My Tasks - Visible to team_member role */}
          {hasRole("team_member") && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                My Tasks
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                    <span className="text-sm text-gray-900">
                      Complete API documentation
                    </span>
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    In Progress
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                    <span className="text-sm text-gray-900">
                      Review code changes
                    </span>
                  </div>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    Urgent
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                    <span className="text-sm text-gray-500 line-through">
                      Setup development environment
                    </span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Completed
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
