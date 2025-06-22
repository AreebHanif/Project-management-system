import mongoose from "mongoose";
const { Schema } = mongoose;

const TaskAssignmentSchema = new Schema({
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    moduleId: { type: Schema.Types.ObjectId, ref: 'ProjectSection', required: true },
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    userAssignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assignedDate: { type: Date, default: Date.now },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    taskStatus: { type: String, enum: ['Completed', 'Suspended', 'InProgress'], default: 'InProgress' },
    taskProgress: { type: Number, default: 0 }, // percentage
    completionDate: { type: Date },
    description: { type: String }
}, { timestamps: true });

export default mongoose.model('TaskAssignment', TaskAssignmentSchema);
// This schema defines the structure of the TaskAssignment document in MongoDB.
// It includes fields for projectId (reference to Project), moduleId (reference to ProjectSection),