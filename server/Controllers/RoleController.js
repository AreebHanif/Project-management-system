import exprress from "express"
import Role from "../models/Role.js";
import UserRoles from "../models/UserRoles.js";

const getDashboardData = async (req, res) => {
    let userId = req.user._id;
    console.log(userId)
    try {
        let roleName = await UserRoles.find({ userId: userId }).populate({ roleId, })
        if (!roles || roles.length === 0) {
            return res.status(404).json({ message: "User is not assigned to any modules or tasks." })
        }

    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return res.status(500).json({ message: "Internal server error." })
    }
} 