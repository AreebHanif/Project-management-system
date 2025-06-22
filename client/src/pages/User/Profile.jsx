import { useState } from "react";
import {
  User,
  Mail,
  Briefcase,
  Edit2,
  Settings,
  CheckCircle,
  XCircle,
  Camera,
  Shield,
} from "lucide-react";
import { useSelector } from "react-redux";

import UpdateUserModal from "../../components/Modal/UpdateUserModal";
import { setCredentials } from "../../redux/features/auth/authSlice";

export default function Profile() {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const handleEditProfile = () => {
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </div>
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 px-8 py-12 text-white relative">
            <div className="absolute top-6 right-6">
              <button
                onClick={handleEditProfile}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105"
                title="Edit Profile"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center">
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-6">
                  <span className="text-3xl font-bold text-white">
                    {userInfo?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                </div>
                <button className="absolute -bottom-2 right-4 bg-white text-indigo-600 p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">{userInfo?.name}</h2>
                <p className="text-white/80 mb-1">{userInfo?.email}</p>
                <div className="flex items-center">
                  {userInfo?.active ? (
                    <div className="flex items-center bg-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Active</span>
                    </div>
                  ) : (
                    <div className="flex items-center bg-red-500/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <XCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Inactive</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <User className="w-5 h-5 mr-2 text-indigo-600" />
                  Personal Information
                </h3>

                <div className="space-y-6">
                  {/* Full Name */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Full Name
                    </label>
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-gray-900 font-medium">
                        {userInfo?.name || "Not provided"}
                      </span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Email Address
                    </label>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-gray-900 font-medium">
                        {userInfo?.email || "Not provided"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-indigo-600" />
                  Professional Information
                </h3>

                <div className="space-y-6">
                  {/* Designation */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Designation
                    </label>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-700">
                        {userInfo?.designation || "Not assigned"}
                      </span>
                    </div>
                  </div>

                  {/* Account Status */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Account Status
                    </label>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-gray-400 mr-3" />
                      {userInfo?.active ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active Account
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
                          <XCircle className="w-3 h-3 mr-1" />
                          Inactive Account
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleEditProfile}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="flex items-center justify-center">
                    <Edit2 className="w-5 h-5 mr-2" />
                    Edit Profile
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Additional Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Profile Completion */}
          {/* <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">
                Profile Completion
              </h4>
              <div className="text-2xl font-bold text-indigo-600">85%</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div
                className="bg-gradient-to-r from-indigo-600 to-cyan-600 h-2 rounded-full transition-all duration-300"
                style={{ width: "85%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              Complete your profile to unlock all features
            </p>
          </div> */}

          {/* Last Updated */}
          {/* <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Last Updated</h4>
              <Settings className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              2 days ago
            </div>
            <p className="text-sm text-gray-600">
              Profile information was last modified
            </p>
          </div> */}

          {/* Security Level */}
          {/* <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Security Level</h4>
              <Shield className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">High</div>
            <p className="text-sm text-gray-600">
              Your account is well protected
            </p>
          </div> */}
        </div>
      </div>

      {/* Update User Modal */}
      <UpdateUserModal
        user={userInfo}
        isOpen={showUpdateModal}
        onClose={handleCloseModal}
        setCredentials={setCredentials}
      />
    </div>
  );
}
