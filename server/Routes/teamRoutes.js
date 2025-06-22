import express from "express";
import {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeamById,
    deleteTeamById,
    addMemberToTeam,
    getTeamMembers,
    removeMemberById,
} from "../Controllers/TeamController.js";
import { isAuthenticated, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/')
    .post(isAuthenticated, isAdmin, createTeam)
    .get(isAuthenticated, getAllTeams);
router.route('/:id')
    .get(isAuthenticated, getTeamById);
router.route("/:id")
    .delete(isAuthenticated, isAdmin, deleteTeamById)
    .put(isAuthenticated, isAdmin, updateTeamById);

router.route("/add-member")
    .post(isAuthenticated, isAdmin, addMemberToTeam);
router.route("/:teamId/members")
    .get(isAuthenticated, isAdmin, getTeamMembers);
router.route("/remove-member/:teamId/:userId")
    .delete(isAuthenticated, isAdmin, removeMemberById);

export default router;
