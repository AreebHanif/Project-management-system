import Task from '../models/Task.js'
import TaskAssignment from '../models/TaskAssignment.js'
import Role from '../models/Role.js'
import UserRoles from '../models/UserRoles.js'
import TeamAssignedToModule from '../models/TeamAssignedToModule.js'

const createTask = async (req, res) => {
    try {
        const { taskName, moduleId, description, priority, isCompleted } = req.body
        if (!taskName || !moduleId || !description || !priority) {
            return res.status(400).json({ message: "All the fields are required" })
        }
        const newTask = new Task({
            name: taskName, moduleId, description, priority, isCompleted
        })
        if (!newTask) {
            return res.status(400).json({ message: "Error creating a task" })
        }
        await newTask.save()
        return res.status(201).json({ message: "Task created successfully" })
    } catch (error) {
        console.log("Error creating task", error)
        return res.status(500).json({ message: "Internal server error T-01", Error: error.message })
    }
}

const updateTaskById = async (req, res) => {
    try {
        const { id } = req.params
        const { name, description, priority, active, isCompleted } = req.body;
        // if (name) await Task.findByIdAndUpdate(id, { name })
        // if (description) await Task.findByIdAndUpdate(id, { description })
        // if (priority) await Task.findByIdAndUpdate(id, { priority })
        // if (priority) await Task.findByIdAndUpdate(id, { priority })
        // if (priority) await Task.findByIdAndUpdate(id, { priority })
        await Task.findByIdAndUpdate(id, { name, description, priority, active, isCompleted })
        const updatedTask = await Task.findById(id)
        return res.status(200).json({ message: "Task updated successfully", updatedTask })
    } catch (error) {
        console.log("Error creating task", error)
        return res.status(500).json({ message: "Internal server error T-02", Error: error.message })
    }
}

const deleteTaskById = async (req, res) => {
    try {
        const { id } = req.params
        const isDeleted = await Task.findByIdAndDelete(id)
        if (!isDeleted) {
            return res.status(400).json({ message: "Task deletion failed" })
        }
        return res.status(200).json({ message: "Task Deleted successfully" })
    } catch (error) {
        console.log("Error creating task", error)
        return res.status(500).json({ message: "Internal server error T-03", Error: error.message })
    }
}

const getTaskListById = async (req, res) => {
    try {
        const { id } = req.params;
        const taskList = await Task.find({ moduleId: id });

        if (!taskList.length) {
            return res.status(404).json({ message: "No tasks created yet" });
        }
        return res.status(200).json({ tasksList: taskList });
    } catch (error) {
        console.log("Error fetching tasks", error);
        return res.status(500).json({
            message: "Internal server error T-04",
            error: error.message,
        });
    }
};

const getTaskById = async (req, res) => {
    try {
        const { moduleId, taskId } = req.params;

        if (!moduleId || !taskId) {
            return res.status(400).json({ message: "Module ID and Task ID are required" });
        }

        // 1. Fetch task and populate module and project
        const task = await Task.findOne({ _id: taskId, moduleId })
            .populate({
                path: "moduleId",
                select: "moduleName projectId teamLeader",
                populate: [
                    {
                        path: "projectId",
                        select: "projectName projectStartDate projectEndDate",
                    },
                    {
                        path: "teamLeader",
                        select: "name"
                    }
                ]
            });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // 2. Get task assignment and populate assigned user
        const taskAssignment = await TaskAssignment.findOne({ taskId })
            .select("userAssignedTo assignedDate completionDate taskStatus taskProgress")
            .populate("userAssignedTo", "name");

        return res.status(200).json({
            taskName: task?.name || null,
            moduleName: task?.moduleId?.moduleName || null,
            projectName: task?.moduleId?.projectId?.projectName || null,
            projectStartDate: task?.moduleId?.projectId?.projectStartDate || null,
            projectEndDate: task?.moduleId?.projectId?.projectEndDate || null,
            teamLeaderName: task?.moduleId?.teamLeader?.name || null,
            isCompleted: task?.isCompleted || false,
            description: task?.description || null,
            isActive: task?.active || false,
            priority: task?.priority || null,

            // Assignment info
            userName: taskAssignment?.userAssignedTo?.name || null,
            assignDate: taskAssignment?.assignedDate || null,
            completionDate: taskAssignment?.completionDate || null,
            userId: taskAssignment?.userAssignedTo?._id || null,
            taskStatus: taskAssignment?.taskStatus || null,
            taskProgress: taskAssignment?.taskProgress || 0,
        });
    } catch (error) {
        console.error("Error fetching task by ID", error);
        return res.status(500).json({
            message: "Internal server error T-04",
            error: error.message,
        });
    }
};

const taskAssignedToUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { projectId, moduleId, taskId, teamId, roleName, completionDate } = req.body;

        if (!id || !projectId || !moduleId || !taskId || !teamId || !roleName, !completionDate) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Avoid duplicate team-module assignment
        let existingTeamAssignment = await TeamAssignedToModule.findOne({ teamId, moduleId });
        if (!existingTeamAssignment) {
            const teamAssigned = new TeamAssignedToModule({ teamId, moduleId });
            await teamAssigned.save();
        }

        // Avoid duplicate task assignment
        const existingAssignment = await TaskAssignment.findOne({ taskId, userAssignedTo: id });
        if (existingAssignment) {
            return res.status(400).json({ message: "Task already assigned to this user" });
        }

        const taskAssignment = new TaskAssignment({
            projectId,
            moduleId,
            taskId,
            userAssignedTo: id,
            completionDate,
        });

        const savedTaskAssignment = await taskAssignment.save();
        if (!savedTaskAssignment) {
            return res.status(400).json({ message: "Error assigning task" });
        }

        // Check if role already exists
        let role = await Role.findOne({ roleName });
        if (!role) {
            role = new Role({ roleName });
            await role.save();
        }

        // Avoid duplicate user-role assignment
        const existingUserRole = await UserRoles.findOne({ userId: id, roleId: role._id });
        if (!existingUserRole) {
            const userRole = new UserRoles({ userId: id, roleId: role._id });
            await userRole.save();

            return res.status(201).json({
                message: "Task and role assigned successfully",
                taskAssignment: savedTaskAssignment,
                userRole,
            });
        }

        return res.status(201).json({
            message: "Task assigned successfully (role already assigned)",
            taskAssignment: savedTaskAssignment,
        });
    } catch (error) {
        console.error("Error assigning task:", error);
        return res.status(500).json({
            message: "Internal server error T-05",
            error: error.message,
        });
    }
}

const taskAssignmentUpdate = async (req, res) => {
    try {
        const { taskId, userId } = req.params;
        const { taskStatus, taskProgress } = req.body;

        // Validate required params
        if (!taskId || !userId) {
            return res.status(400).json({ message: "Task ID and User ID are required" });
        }

        // Validate taskStatus if provided
        const validStatuses = ["InProgress", "Completed", "Pending"];
        if (taskStatus && !validStatuses.includes(taskStatus)) {
            return res.status(400).json({ message: "Invalid task status" });
        }

        // Validate taskProgress if provided
        if (typeof taskProgress !== "undefined") {
            if (typeof taskProgress !== "number" || taskProgress < 1 || taskProgress > 100) {
                return res.status(400).json({ message: "Task progress must be a number between 1 and 100" });
            }
        }

        // Check if task assignment exists
        const taskUpdate = await Task.findById(taskId)
        if (!taskUpdate) {
            return res.status(404).json({ message: "Task not found" });
        }

        const taskAssignment = await TaskAssignment.findOne({ taskId, userAssignedTo: userId });
        if (!taskAssignment) {
            return res.status(404).json({ message: "Task assignment not found for this user" });
        }

        // Build update object
        const updateFields = {};
        if (taskStatus === "Completed") {
            updateFields.taskProgress = 100
        }
        // If progress is provided, check for auto-completion
        if (typeof taskProgress !== "undefined") {
            updateFields.taskProgress = taskProgress;

            if (taskProgress === 100) {
                updateFields.taskStatus = "Completed";
                taskUpdate.isCompleted = true;
                await taskUpdate.save();
            } else if (taskStatus) {
                updateFields.taskStatus = taskStatus;
            }
        } else if (taskStatus) {
            updateFields.taskStatus = taskStatus;
        }

        // Update assignment
        const updatedAssignment = await TaskAssignment.findOneAndUpdate(
            { taskId, userAssignedTo: userId },
            updateFields,
            { new: true }
        );

        if (!updatedAssignment) {
            return res.status(400).json({ message: "Error updating task assignment" });
        }

        return res.status(200).json({
            message: "Task assignment updated successfully",
            updatedAssignment,
        });
    } catch (error) {
        console.error("Error updating task assignment:", error);
        return res.status(500).json({ message: "Internal server error T-07", error: error.message });
    }
};

export {
    createTask,
    updateTaskById,
    deleteTaskById,
    getTaskListById,
    taskAssignedToUser,
    getTaskById,
    taskAssignmentUpdate,
}