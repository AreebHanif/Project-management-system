import express from "express"
import {
    getModulesList,
    deleteModuleById,
    updateModuleById,
    getModuleById,
    createModule,
    teamAssignedToModule
} from "../Controllers/ProjectSectionController.js"
import { isAdmin, isAuthenticated } from "../middleware/authMiddleware.js"

const router = express.Router()

// Get modules for a project OR create module under a project
router.route("/project/:projectId")
    .get(isAuthenticated, isAdmin, getModulesList)
    .post(isAuthenticated, isAdmin, createModule)

// CRUD operations for a specific module by its ID
router.route('/module/:id')
    .get(isAuthenticated, getModuleById)
    .put(isAuthenticated, isAdmin, updateModuleById)
    .delete(isAuthenticated, isAdmin, deleteModuleById)

// Assign team to a module
router.route('/team-module')
    .post(isAuthenticated, isAdmin, teamAssignedToModule)

export default router
