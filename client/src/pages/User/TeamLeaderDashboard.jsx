import React, { useState } from "react";
import {
  Users,
  Target,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Calendar,
  User,
  ChevronRight,
  Activity,
  Zap,
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data representing the user's multiple roles
  const userRoles = {
    asLeader: [
      {
        project: "E-commerce Platform",
        module: "Payment Gateway",
        teamSize: 5,
        tasksTotal: 12,
        tasksCompleted: 8,
        deadline: "2025-07-15",
        status: "on-track",
        priority: "high",
      },
      {
        project: "Mobile Banking",
        module: "Security Module",
        teamSize: 3,
        tasksTotal: 8,
        tasksCompleted: 3,
        deadline: "2025-07-30",
        status: "at-risk",
        priority: "critical",
      },
    ],
    asMember: [
      {
        project: "CRM System",
        module: "Analytics Dashboard",
        role: "Senior Developer",
        leader: "Sarah Chen",
        myTasks: 4,
        completedTasks: 2,
        deadline: "2025-08-10",
        status: "on-track",
        priority: "medium",
      },
      {
        project: "Inventory Management",
        module: "Reporting Engine",
        role: "Team Member",
        leader: "Mike Johnson",
        myTasks: 6,
        completedTasks: 5,
        deadline: "2025-06-28",
        status: "ahead",
        priority: "low",
      },
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "on-track":
        return "border-emerald-400 bg-emerald-50 text-emerald-700";
      case "at-risk":
        return "border-amber-400 bg-amber-50 text-amber-700";
      case "behind":
        return "border-rose-400 bg-rose-50 text-rose-700";
      case "ahead":
        return "border-cyan-400 bg-cyan-50 text-cyan-700";
      default:
        return "border-slate-400 bg-slate-50 text-slate-700";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const TabButton = ({ id, label, isActive, onClick, icon: Icon }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-2 px-6 py-4 font-semibold text-sm rounded-2xl transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105"
          : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 hover:shadow-md"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  const ProjectCard = ({ project, isLeader = false }) => (
    <div className="group relative bg-white rounded-3xl shadow-sm border border-slate-200 p-8 hover:shadow-2xl hover:border-indigo-200 transition-all duration-500 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>

      {/* Priority Indicator */}
      <div className="absolute top-6 right-6">
        <div
          className={`w-3 h-3 rounded-full ${getPriorityColor(
            project.priority
          )} shadow-lg`}
        ></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-700 transition-colors">
              {project.project}
            </h3>
            <p className="text-slate-500 font-medium">{project.module}</p>
          </div>
        </div>

        <div
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(
            project.status
          )} mb-6`}
        >
          <Activity className="w-4 h-4 mr-2" />
          {project.status.replace("-", " ").toUpperCase()}
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {isLeader ? (
            <>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 rounded-xl">
                  <Users className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Team Size</p>
                  <p className="font-bold text-slate-800">
                    {project.teamSize} members
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 rounded-xl">
                  <Target className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Progress</p>
                  <p className="font-bold text-slate-800">
                    {project.tasksCompleted}/{project.tasksTotal} tasks
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-xl">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Role</p>
                  <p className="font-bold text-slate-800">{project.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">My Tasks</p>
                  <p className="font-bold text-slate-800">
                    {project.completedTasks}/{project.myTasks} done
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-600 font-medium">
              Due: {project.deadline}
            </span>
          </div>
          {!isLeader && (
            <span className="text-sm text-slate-500">
              Lead by {project.leader}
            </span>
          )}
        </div>

        <div className="relative">
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                project.status === "at-risk"
                  ? "bg-gradient-to-r from-amber-400 to-orange-500"
                  : project.status === "ahead"
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                  : "bg-gradient-to-r from-emerald-400 to-green-500"
              }`}
              style={{
                width: `${
                  isLeader
                    ? (project.tasksCompleted / project.tasksTotal) * 100
                    : (project.completedTasks / project.myTasks) * 100
                }%`,
              }}
            ></div>
          </div>
          <div className="absolute -top-1 -right-1">
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    </div>
  );

  const OverviewStats = () => {
    const totalLeaderProjects = userRoles.asLeader.length;
    const totalMemberProjects = userRoles.asMember.length;
    const totalTeamMembers = userRoles.asLeader.reduce(
      (sum, p) => sum + p.teamSize,
      0
    );
    const leaderTasksCompleted = userRoles.asLeader.reduce(
      (sum, p) => sum + p.tasksCompleted,
      0
    );
    const memberTasksCompleted = userRoles.asMember.reduce(
      (sum, p) => sum + p.completedTasks,
      0
    );

    const stats = [
      {
        label: "Leading Projects",
        value: totalLeaderProjects,
        icon: Users,
        gradient: "from-violet-500 to-purple-600",
        bgPattern: "from-violet-100 to-purple-100",
      },
      {
        label: "Contributing Projects",
        value: totalMemberProjects,
        icon: Target,
        gradient: "from-emerald-500 to-teal-600",
        bgPattern: "from-emerald-100 to-teal-100",
      },
      {
        label: "Team Members",
        value: totalTeamMembers,
        icon: TrendingUp,
        gradient: "from-cyan-500 to-blue-600",
        bgPattern: "from-cyan-100 to-blue-100",
      },
      {
        label: "Completed Tasks",
        value: leaderTasksCompleted + memberTasksCompleted,
        icon: Zap,
        gradient: "from-orange-500 to-red-600",
        bgPattern: "from-orange-100 to-red-100",
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-500 overflow-hidden"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.bgPattern} opacity-50 group-hover:opacity-70 transition-opacity`}
            ></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 bg-gradient-to-r ${stat.gradient} rounded-2xl shadow-lg`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-slate-500 text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-slate-800 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Project Command Center
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Your unified workspace for leadership excellence and collaborative
            success
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center space-x-2 mb-12 bg-white/70 backdrop-blur-md p-2 rounded-3xl shadow-lg border border-white/50 w-fit mx-auto">
          <TabButton
            id="overview"
            label="Overview"
            icon={Activity}
            isActive={activeTab === "overview"}
            onClick={setActiveTab}
          />
          <TabButton
            id="leading"
            label="Leadership"
            icon={Users}
            isActive={activeTab === "leading"}
            onClick={setActiveTab}
          />
          <TabButton
            id="contributing"
            label="Contributions"
            icon={Target}
            isActive={activeTab === "contributing"}
            onClick={setActiveTab}
          />
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="space-y-12">
            <OverviewStats />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Leadership Portfolio
                  </h2>
                </div>
                <div className="space-y-6">
                  {userRoles.asLeader.map((project, index) => (
                    <ProjectCard
                      key={index}
                      project={project}
                      isLeader={true}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Active Contributions
                  </h2>
                </div>
                <div className="space-y-6">
                  {userRoles.asMember.map((project, index) => (
                    <ProjectCard
                      key={index}
                      project={project}
                      isLeader={false}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "leading" && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Leadership Dashboard
              </h2>
              <p className="text-slate-600 text-lg">
                Orchestrate your teams and drive module success
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {userRoles.asLeader.map((project, index) => (
                <ProjectCard key={index} project={project} isLeader={true} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "contributing" && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Contribution Hub
              </h2>
              <p className="text-slate-600 text-lg">
                Track your impact across collaborative projects
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {userRoles.asMember.map((project, index) => (
                <ProjectCard key={index} project={project} isLeader={false} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
