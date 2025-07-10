import { useState } from "react";
import {
  CheckCircle,
  Users,
  FolderOpen,
  Calendar,
  BarChart3,
  Play,
  Star,
  Award,
  Target,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: FolderOpen,
      title: "Project Management",
      description:
        "Create and organize projects with complete visibility and control over every aspect of your workflow.",
    },
    {
      icon: Target,
      title: "Module Creation",
      description:
        "Break down projects into manageable modules for better organization and focused development.",
    },
    {
      icon: CheckCircle,
      title: "Task Assignment",
      description:
        "Assign tasks to team members with clear deadlines and priority levels for maximum efficiency.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Foster seamless collaboration with real-time updates and communication tools.",
    },
  ];

  const stats = [
    { number: "50+", label: "Projects Completed", icon: Award },
    { number: "200+", label: "Tasks Managed", icon: CheckCircle },
    { number: "15+", label: "Team Members", icon: Users },
    { number: "98%", label: "Success Rate", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2" />
              Streamline Your Project Workflow
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Manage Projects,
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                {" "}
                Deliver Results
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your project management experience with our
              comprehensive system. Create projects, organize modules, assign
              tasks, and collaborate seamlessly with your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to={'/dashboard'}>
                <button className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-cyan-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  Go to dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-2xl mb-4">
                  <stat.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                {" "}
                Succeed
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive project management system provides all the tools
              you need to plan, execute, and deliver successful projects.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${activeFeature === index
                    ? "border-indigo-600 bg-white shadow-lg scale-105"
                    : "border-gray-200 bg-white hover:border-indigo-300"
                    }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start">
                    <div
                      className={`p-3 rounded-xl mr-4 ${activeFeature === index
                        ? "bg-gradient-to-r from-indigo-600 to-cyan-600"
                        : "bg-gray-100"
                        }`}
                    >
                      <feature.icon
                        className={`w-6 h-6 ${activeFeature === index
                          ? "text-white"
                          : "text-gray-600"
                          }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-2xl p-6 text-white mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Active Project</h3>
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                      In Progress
                    </span>
                  </div>
                  <div className="text-2xl font-bold mb-2">
                    E-Commerce Platform
                  </div>
                  <div className="text-indigo-100">75% Complete</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          User Authentication
                        </div>
                        <div className="text-sm text-gray-500">Completed</div>
                      </div>
                    </div>
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Payment Gateway
                        </div>
                        <div className="text-sm text-gray-500">In Progress</div>
                      </div>
                    </div>
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                        <Calendar className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Product Catalog
                        </div>
                        <div className="text-sm text-gray-500">Pending</div>
                      </div>
                    </div>
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Project Management?
          </h2>
          <p className="text-xl text-indigo-100 mb-10">
            Join thousands of teams who have streamlined their workflow with
            ProjectFlow. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-200">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold">ProjectFlow</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering teams to deliver exceptional projects through
                intelligent project management and seamless collaboration.
              </p>
              <div className="flex items-center text-gray-400">
                <Shield className="w-5 h-5 mr-2" />
                <span>Enterprise-grade security</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 ProjectFlow. All rights reserved. Built for your Final
              Year Project.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
