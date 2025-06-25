import Team from "../models/Team.js";
import TeamDetail from "../models/TeamDetail.js";

// Create a new team
const createTeam = async (req, res) => {
    const { teamName } = req.body;
    try {
        const team = await Team.create({ teamName });
        res.status(201).json(team);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all teams
const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find({});
        res.status(200).json(teams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single team by ID
const getTeamById = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ message: "Team not found" });
        res.status(200).json(team);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update team
const updateTeamById = async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!team) return res.status(404).json({ message: "Team not found" });
        res.status(200).json(team);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete team
const deleteTeamById = async (req, res) => {
    try {
        await Team.findByIdAndDelete(req.params.id);
        await TeamDetail.deleteMany({ teamId: req.params.id }); // Remove all members from that team
        res.status(200).json({ message: "Team and its members deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add member to a team
const addMemberToTeam = async (req, res) => {
    const { teamId, userId } = req.body;
    try {
        const alreadyExists = await TeamDetail.findOne({ teamId, userId });
        if (alreadyExists) {
            return res.status(400).json({ message: "User already in the team" });
        }
        const detail = await TeamDetail.create({ teamId, userId });
        res.status(201).json(detail);
    } catch (err) {
        console.log('T-06')
        res.status(500).json({ message: "Error adding member to team t-06", error: err.message });
    }
};

// Get all members of a team
const getTeamMembers = async (req, res) => {
    try {
        const members = await TeamDetail.find({ teamId: req.params.teamId })
            .populate("userId", "name email designation active") // select specific fields from User
            .populate("teamId", "teamName"); // populate team name from Team collection
        const filteredMembers = members.map((member) => ({
            teamId: member.teamId?._id,
            userId: member.userId?._id,
            name: member.userId?.name,
            email: member.userId?.email,
            designation: member.userId?.designation,
            active: member.userId?.active,
            teamName: member.teamId?.teamName
        }));
        return res.status(200).json(filteredMembers);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Remove a member from a team
const removeMemberById = async (req, res) => {
    try {
        const { teamId, userId } = req.params;
        const deletedDetail = await TeamDetail.findOneAndDelete({ teamId, userId });
        if (deletedDetail === null) {
            return res.status(404).json({ message: "Member not found in the team" });
        }
        res.status(200).json({ message: "Member removed from team", deletedDetail });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeamById,
    deleteTeamById,
    addMemberToTeam,
    getTeamMembers,
    removeMemberById
}