import Project from '../models/Project.js'
import Module from '../models/ProjectSection.js'
import Task from '../models/Task.js'
import Team from '../models/Team.js'
import TeamMember from '../models/TeamDetail.js'
import TaskAssignment from '../models/TaskAssignment.js'
import User from '../models/User.js'
import TeamAssignedToModule from '../models/TeamAssignedToModule.js'

let adminDashboard = async (req, res) => {
    try {
        let projectCount = await Project.find({}).countDocuments()
        let moduleCount = await Module.find({ active: true }).countDocuments()
        let completedTaskCount = await Task.find({ isCompleted: true }).countDocuments()
        let teamCount = await Team.find({}).countDocuments()
        let memberCount = await TeamMember.find({}).countDocuments()
        let taskStatusCount = await TaskAssignment.find({ taskStatus: "Pending" }).countDocuments()

        return res.status(200).json({
            projectCount,
            moduleCount,
            completedTaskCount,
            teamCount,
            memberCount,
            taskStatusCount
        })

    } catch (error) {
        console.log("Internal server error ", error)
        return res.status(500).json({ message: "Internal server error D-0" })
    }
}

let userDashboard = async (req, res) => {
    try {
        let userId = req.user._id
        console.log(userId)
        let taskAssignedCount = await TaskAssignment.find({ userAssignedTo: userId }).countDocuments()
        res.json(taskAssignedCount)
    } catch (error) {
        console.log("Something went wrong ", error)
        return res.status(500).json({ message: "Internal server error D-2" })
    }
}

export { adminDashboard, userDashboard }