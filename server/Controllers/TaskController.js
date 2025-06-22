import Task from '../models/Task.js'
import TaskAssignment from '../models/TaskAssignment.js'
import Role from '../models/Role.js'
import UserRoles from '../models/UserRoles.js'

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
        const { name, description, priority, active, isCompleted } = req.body
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
        console.log("Module ID:", id);

        const taskList = await Task.find({ moduleId: id }); // ✅ This is correct

        if (!taskList.length) {
            return res.status(404).json({ message: "No tasks created yet" });
        }

        console.log("taskList", taskList);
        return res.status(200).json({ tasksList: taskList });
    } catch (error) {
        console.log("Error fetching tasks", error);
        return res.status(500).json({
            message: "Internal server error T-04",
            error: error.message,
        });
    }
};

const taskAssignedToUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { projectId, moduleId, taskId, priority, description, roleName } = req.body;

        // Create a new task assignment document
        const taskAssignment = new TaskAssignment({
            projectId,
            moduleId,
            taskId,
            userAssignedTo: id,
            priority,
            description,
        });

        // Save the task assignment document to MongoDB
        const savedTaskAssignment = await taskAssignment.save()
        if (!savedTaskAssignment) {
            return res.status(400).json({ message: "Error assigning task" });
        }
        const roleAssigned = new Role({ roleName })
        await roleAssigned.save()
        if (!roleAssigned) {
            return res.status(400).json({ message: "Error assigning role" });
        }
        const userRole = new UserRoles({
            userId: id,
            roleId: roleAssigned._id
        });
        await userRole.save();
        return res.status(201).json({
            message: "Task assigned successfully",
            taskAssignment: savedTaskAssignment,
            userRole: userRole
        });

    } catch (error) {
        console.error('Error assigning task:', error);
        return res.status(500).json({ message: "Internal server error T-05", Error: error.message });
    }
}

export {
    createTask,
    updateTaskById,
    deleteTaskById,
    getTaskListById,
    taskAssignedToUser,
}