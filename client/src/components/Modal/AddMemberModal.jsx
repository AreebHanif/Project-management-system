import { useState, useEffect } from "react";
import { X, Users, Plus, Loader2 } from "lucide-react";
import { useGetAllUsersQuery } from "../../redux/Api/userApiSlice";
import { toast } from "react-toastify";
import { useAddMemberToTeamMutation } from "../../redux/Api/teamSlice";

const AddMemberModal = ({ setModal, teamId, refetch, teamname }) => {
  const [teamName, setTeamName] = useState(teamname ? teamname : "");
  const [selectedUserId, setSelectedUserId] = useState("");

  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useGetAllUsersQuery();
  const [addMemberToTeam, { isLoading: addingMember, error: addError }] =
    useAddMemberToTeamMutation();

  const handleSubmit = async () => {
    if (!teamName.trim() || !selectedUserId) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await addMemberToTeam({
        teamId: teamId,
        userId: selectedUserId,
      }).unwrap();

      // Reset form
      setTeamName("");
      setSelectedUserId("");
      setModal(false);
      refetch();
      toast.success("Team member added successfully!");
    } catch (error) {
      console.error("Failed to add team member:", error);
      toast.error(
        error?.data?.message || "Failed to add team member. Please try again."
      );
    }
  };

  const handleClose = () => {
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  };

  return (
    <div className="fixed inset-0 bg-none bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Add Team Member
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          {/* Team Name Input */}
          <div>
            <label
              htmlFor="teamName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Team Name
            </label>
            <input
              type="text"
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter team name"
              required
            />
          </div>

          {/* User Selection Dropdown */}
          <div>
            <label
              htmlFor="userSelect"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Team Member
            </label>

            {usersLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                <span className="ml-2 text-sm text-gray-600">
                  Loading users...
                </span>
              </div>
            ) : usersError ? (
              <div className="text-red-600 text-sm py-2">
                Failed to load users. Please try again.
              </div>
            ) : (
              <select
                id="userSelect"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a user</option>
                {users?.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Error Display */}
          {addError && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {addError.message || "Failed to add team member"}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={addingMember || !teamName.trim() || !selectedUserId}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {addingMember ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Member
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
