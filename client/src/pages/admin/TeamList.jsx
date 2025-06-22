import { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Users,
  ChevronDown,
  ChevronRight,
  Check,
  X,
  Edit2,
  Trash2,
  User,
  Briefcase,
  Mail,
} from "lucide-react";
import TeamModal from "../../components/Modal/TeamModal";
import {
  useGetTeamListQuery,
  useDeleteTeamByIdMutation,
  useGetMembersByTeamIdQuery,
  useRemoveMemberFromTeamByIdMutation,
} from "../../redux/Api/teamSlice";
import { toast } from "react-toastify";
import AddMemberModal from "../../components/Modal/AddMemberModal";

// Skeleton loader component for better loading UX
const MemberSkeleton = () => (
  <div className="bg-white rounded-lg p-3 border border-gray-200 animate-pulse">
    <div className="grid grid-cols-12 gap-4 items-center">
      <div className="col-span-4 flex items-center">
        <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
      <div className="col-span-4 flex items-center">
        <div className="w-3 h-3 bg-gray-200 rounded mr-2"></div>
        <div className="h-3 bg-gray-200 rounded w-32"></div>
      </div>
      <div className="col-span-2 flex items-center">
        <div className="w-3 h-3 bg-gray-200 rounded mr-2"></div>
        <div className="h-3 bg-gray-200 rounded w-20"></div>
      </div>
      <div className="col-span-1 text-center">
        <div className="w-2 h-2 bg-gray-200 rounded-full mx-auto"></div>
      </div>
      <div className="col-span-1 text-center">
        <div className="w-4 h-4 bg-gray-200 rounded mx-auto"></div>
      </div>
    </div>
  </div>
);

export default function TeamList() {
  const [expandedTeamId, setExpandedTeamId] = useState(null);
  const [isShowModals, setIsShowModals] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isShowMemberModals, setIsShowMemberModals] = useState(false);
  const [addTeamId, setAddTeamId] = useState(null);
  const [teamName, setTeamName] = useState(null);

  const { data: teams, refetch } = useGetTeamListQuery();
  const [deleteTeamById] = useDeleteTeamByIdMutation();
  const [removeMemberFromTeamById] = useRemoveMemberFromTeamByIdMutation();

  const { data: teamMembers = [], isFetching: isFetchingMembers } =
    useGetMembersByTeamIdQuery(expandedTeamId, { skip: !expandedTeamId });

  // Memoized utility function
  const truncateText = useCallback(
    (text, length) =>
      text && text.length > length ? text.slice(0, length) + "..." : text,
    []
  );

  const toggleTeamExpansion = useCallback((id) => {
    setExpandedTeamId((current) => (current === id ? null : id));
  }, []);

  const handleEditTeam = useCallback((team) => {
    setCurrentTeam(team);
    setIsEdit(true);
    setIsShowModals(true);
  }, []);

  const handleDeleteTeam = useCallback(
    async (id, teamName) => {
      if (
        !window.confirm(
          `Are you sure you want to delete the team "${teamName}"? This action cannot be undone.`
        )
      ) {
        return;
      }

      try {
        const res = await deleteTeamById(id);
        toast.success(res?.data?.message || "Team deleted successfully");
        // Close expanded team if it was the one being deleted
        if (expandedTeamId === id) {
          setExpandedTeamId(null);
        }
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || "Failed to delete team");
      }
    },
    [deleteTeamById, expandedTeamId, refetch]
  );

  const handleCreateTeam = useCallback(() => {
    setCurrentTeam(null);
    setIsEdit(false);
    setIsShowModals(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowModals(false);
    setIsEdit(false);
    setCurrentTeam(null);
  }, []);

  // Handler to add member to team
  const handleAddMemberToTeam = useCallback((teamId, teamName) => {
    setTeamName(teamName);
    setAddTeamId(teamId);
    setIsShowMemberModals(true);
  }, []);

  // Handler to delete member
  const handleDeleteMember = useCallback(
    async (teamId, userId, memberName) => {
      if (
        !window.confirm(
          `Are you sure you want to remove "${memberName}" from the team? This action cannot be undone.`
        )
      ) {
        return;
      }

      try {
        let res = await removeMemberFromTeamById({ teamId, userId });
        if (res?.error) {
          toast.error(res?.error?.data?.message || "Failed to delete member");
        } else {
          toast.success("Member removed successfully");
          // Refetch the teams to update the member list
          refetch();
        }
      } catch (error) {
        toast.error("Failed to delete member");
        console.error("Error removing member:", error);
      }
    },
    [removeMemberFromTeamById, refetch]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Team Management
            </h1>
            <p className="text-gray-600">Manage your teams and their members</p>
          </div>
          <button
            onClick={handleCreateTeam}
            className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg transition-all"
            aria-label="Create new team"
          >
            <div className="flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Create Team
            </div>
          </button>
        </div>

        {/* Team List */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header Row */}
          <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 px-6 py-4 border-b border-gray-200">
            <div className="min-w-[900px] grid grid-cols-12 gap-4 font-medium text-gray-700">
              <div className="col-span-1" />
              <div className="col-span-4 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Team Name
              </div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-3 text-center">Actions</div>
              <div className="col-span-2 text-center">Add Members</div>
            </div>
          </div>

          {/* Body */}
          <div className="overflow-x-auto">
            <div className="divide-y divide-gray-200 min-w-[900px]">
              {/* When there is no team  */}
              {teams?.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No teams found
                  </h3>
                  <p className="text-gray-500">
                    Get started by creating your first team
                  </p>
                </div>
              ) : (
                // When there is team available
                teams?.map((team, idx) => (
                  <div
                    key={team._id}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    {/* Team Row */}
                    <div
                      className={`px-6 py-4 ${
                        idx % 2 === 0 ? "bg-gray-25" : "bg-white"
                      } hover:bg-gradient-to-r hover:from-indigo-25 hover:to-cyan-25 transition-all`}
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-1">
                          <button
                            onClick={() => toggleTeamExpansion(team._id)}
                            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                            aria-label={`${
                              expandedTeamId === team._id
                                ? "Collapse"
                                : "Expand"
                            } ${team.teamName} members`}
                          >
                            {expandedTeamId === team._id ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {/* Name */}
                        <div className="col-span-4 flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-full flex items-center justify-center mr-3">
                            <Users className="w-5 h-5 text-indigo-600" />
                          </div>
                          <p className="font-medium text-gray-900">
                            {team.teamName}
                          </p>
                        </div>
                        {/* Status */}
                        <div className="col-span-2 text-center">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              team.active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                            aria-label={`Team status: ${
                              team.active ? "Active" : "Inactive"
                            }`}
                          >
                            {team.active ? (
                              <>
                                <Check className="w-3 h-3 mr-1" />
                                Active
                              </>
                            ) : (
                              <>
                                <X className="w-3 h-3 mr-1" />
                                Inactive
                              </>
                            )}
                          </span>
                        </div>
                        {/* Actions */}
                        <div className="col-span-3 flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleEditTeam(team)}
                            className="p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
                            aria-label={`Edit ${team.teamName}`}
                            title="Edit team"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteTeam(team._id, team.teamName)
                            }
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            aria-label={`Delete ${team.teamName}`}
                            title="Delete team"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {/* Add Members Button */}
                        <div className="col-span-2 flex items-center justify-center">
                          <button
                            onClick={() =>
                              handleAddMemberToTeam(team._id, team.teamName)
                            }
                            className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                            aria-label={`Add member to ${team.teamName}`}
                            title="Add member to team"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Member List */}
                    {expandedTeamId === team._id && (
                      <div className="bg-gray-50 border-t border-gray-200">
                        <div className="px-6 py-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            Team Members ({teamMembers?.length || 0})
                          </h4>
                          {isFetchingMembers ? (
                            <div
                              className="space-y-2"
                              aria-label="Loading team members"
                            >
                              {[...Array(3)].map((_, idx) => (
                                <MemberSkeleton key={idx} />
                              ))}
                            </div>
                          ) : teamMembers?.length === 0 ? (
                            <div className="text-center py-6">
                              <User className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                              <p className="text-gray-500 text-sm">
                                No members in this team
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {teamMembers?.map((member, index) => {
                                return (
                                  <div
                                    key={member.id || index}
                                    className="bg-white rounded-lg p-3 border border-gray-200 hover:border-indigo-200 transition-colors"
                                  >
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                      {/* Name */}
                                      <div className="col-span-4 flex items-center">
                                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-full flex items-center justify-center mr-3">
                                          <span className="text-indigo-600 font-medium text-xs">
                                            {member.name
                                              ?.split(" ")
                                              .map((n) => n[0])
                                              .join("")
                                              .toUpperCase() || "U"}
                                          </span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">
                                          {member.name || "Unknown"}
                                        </p>
                                      </div>
                                      {/* Email */}
                                      <div className="col-span-4 flex items-center">
                                        <Mail className="w-3 h-3 text-gray-400 mr-2" />
                                        <span
                                          className="text-sm text-gray-600"
                                          title={member.email}
                                        >
                                          {truncateText(member.email, 25) ||
                                            "No email"}
                                        </span>
                                      </div>
                                      {/* Designation */}
                                      <div className="col-span-2 flex items-center">
                                        <Briefcase className="w-3 h-3 text-gray-400 mr-2" />
                                        <span
                                          className="text-sm text-gray-600"
                                          title={member.designation}
                                        >
                                          {truncateText(
                                            member.designation,
                                            20
                                          ) || "N/A"}
                                        </span>
                                      </div>
                                      {/* Status */}
                                      <div className="col-span-1 text-center">
                                        <span
                                          className={`inline-block w-2 h-2 rounded-full ${
                                            member.active
                                              ? "bg-green-500"
                                              : "bg-red-500"
                                          }`}
                                          title={
                                            member.active
                                              ? "Active"
                                              : "Inactive"
                                          }
                                          aria-label={`User status: ${
                                            member.active
                                              ? "Active"
                                              : "Inactive"
                                          }`}
                                        />
                                      </div>
                                      {/* Member Actions */}
                                      <div className="col-span-1 flex items-center justify-center space-x-1">
                                        <button
                                          onClick={() =>
                                            handleDeleteMember(
                                              team._id,
                                              member.userId || member.id,
                                              member.name
                                            )
                                          }
                                          className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                                          aria-label={`Remove ${member.name} from team`}
                                          title="Remove member from team"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        {isShowModals && (
          <TeamModal
            setIsShowModal={handleCloseModal}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            team={currentTeam}
            refetch={refetch}
          />
        )}
        {isShowMemberModals && (
          <AddMemberModal
            setModal={setIsShowMemberModals}
            teamId={addTeamId}
            refetch={refetch}
            teamname={teamName}
          />
        )}
      </div>
    </div>
  );
}
