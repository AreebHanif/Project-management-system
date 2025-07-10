import ProjectSection from "../models/ProjectSection.js";
import TeamAssignedToModule from "../models/TeamAssignedToModule.js";
import Project from '../models/Project.js'

const createModule = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { moduleName, description, active } = req.body;

        if (!projectId || !moduleName || !description) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if the project exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found for the given ID." });
        }

        // Check if a module with the same name already exists under this project
        const existingModule = await ProjectSection.findOne({
            projectId,
            moduleName: { $regex: new RegExp(`^${moduleName}$`, "i") }, // case-insensitive
        });

        if (existingModule) {
            return res.status(409).json({ message: "A module with the same name already exists in this project." });
        }

        // Create the module
        const newModule = new ProjectSection({
            projectId,
            moduleName,
            active: active ?? true,
            description,
        });

        const savedModule = await newModule.save();

        return res.status(201).json({
            message: "Module created successfully.",
            projectSection: savedModule,
        });

    } catch (error) {
        console.error("Error creating module:", error);
        return res.status(500).json({ message: "Internal server error. M-01" });
    }
};

const getModulesList = async (req, res) => {
    try {
        const { projectId } = req.params;
        if (!projectId) {
            return res.status(400).json({ message: "Project ID is required." });
        }
        const modulesList = await ProjectSection.find({ projectId }).select("-__v");
        if (modulesList.length === 0) {
            return res.status(404).json({ message: "No modules found for this project." });
        }
        return res.status(200).json({ message: "Modules retrieved successfully.", modulesList });

    } catch (error) {
        console.error("Error retrieving modules:", error);
        return res.status(500).json({ message: "Internal server error. M-02" });
    }
};

const deleteModuleById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Module ID is required." });
        }

        // Delete the module by ID
        const deletedModule = await ProjectSection.findByIdAndDelete(id);

        // Find and delete associated tasks
        let taskDeleted = await Task.findById(id);
        await taskDeleted.deleteMany();

        // If module is not found, return 404
        if (!deletedModule) {
            return res.status(404).json({ message: "Module not found." });
        }

        // Return success message and deleted module details
        return res.status(200).json({ message: "Module deleted successfully.", deletedModule });
    } catch (error) {
        console.error("Error deleting module and tasks:", error);
        return res.status(500).json({ message: "Internal server error. M-03" });
    }
};

const updateModuleById = async (req, res) => {
    try {
        const { id } = req.params;
        const { moduleName, description, active } = req.body
        if (!id || !moduleName || !description) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const updatedModule = await ProjectSection.findByIdAndUpdate(id, { moduleName, description, active }, { new: true });
        if (!updatedModule) {
            return res.status(404).json({ message: "Module not found." });
        }
        return res.status(200).json({ message: "Module updated successfully.", updatedModule });
    } catch (error) {
        console.error("Error updating module:", error);
        return res.status(500).json({ message: "Internal server error. M-04" });
    }
};

const getModuleById = async (req, res) => {
    try {
        const { id } = req.params;
        const module = await ProjectSection.findById(id).populate("teamLeader", "name -_id");
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        const { projectId } = module;
        if (!projectId) {
            return res.status(400).json({ message: "ProjectId not found" });
        }

        const project = await Project.findById(projectId).select("projectName -_id");

        return res.status(200).json({
            moduleName: module.moduleName,
            active: module.active,
            description: module.description,
            projectName: project?.projectName || null,
            teamLeader: module.teamLeader,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error. M-04" });
    }
};

const teamAssignedToModule = async (req, res) => {
    try {
        const { teamId, moduleId } = req.body;
        if (!teamId || !moduleId) {
            return res.status(400).json({ message: "Team id and module id are required" })
        }

        let isAlreadyAssigned = TeamAssignedToModule.findById({ teamId })
        if (isAlreadyAssigned) {
            return res.status(400).json({ message: "Team Already Assigned to this module." })
        }
        const teamAssigned = new TeamAssignedToModule({
            teamId, moduleId
        })
        if (!teamAssigned) {
            return res.status(400).json({ message: "Error assigning module to team" })
        }
        await teamAssigned.save()

        return res.status(200).json({ message: "Team successfully assigned to module", teamAssigned })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error. M-04" });
    }
};

const teamLeaderAssignedToModule = async (req, res) => {
    try {
        const { teamLeaderId, moduleId } = req.body
        if (!teamLeaderId || !moduleId) {
            return res.status(400).json({ message: "Team leader id and module id are required" });
        }

        const updatedModule = await ProjectSection.findByIdAndUpdate(moduleId, { teamLeader: teamLeaderId }, { new: true }).populate("teamLeader", "name -_id");

        if (!updatedModule) {
            return res.status(404).json({ message: "Module not found or could not be updated" })
        }
        return res.status(200).json({ message: "Team Leader Successfully assigned to module", updatedModule })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error. M-04" })
    }
}

export {
    createModule,
    getModulesList,
    deleteModuleById,
    updateModuleById,
    getModuleById,
    teamAssignedToModule,
    teamLeaderAssignedToModule,
}