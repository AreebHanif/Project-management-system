import express from 'express';
import {
    createTask,
    updateTaskById,
    deleteTaskById,
    getTaskListById,
    taskAssignedToUser,
} from '../Controllers/TaskController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(isAuthenticated, createTask)

router
    .route('/:id')
    .put(isAuthenticated, updateTaskById)
    .delete(isAuthenticated, deleteTaskById)
    .get(isAuthenticated, getTaskListById);
router
    .route('/assigned/:id')
    .post(isAuthenticated, taskAssignedToUser)

export default router;