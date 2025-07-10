import express from 'express'
import { adminDashboard, userDashboard } from "../Controllers/DashboardController.js";
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js'

let router = express.Router()

router.route('/')
    .get(isAuthenticated, isAdmin, adminDashboard)

router.route('/user')
    .get(isAuthenticated, userDashboard)

export default router