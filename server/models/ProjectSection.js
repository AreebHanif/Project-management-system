import mongoose from "mongoose";
const { Schema } = mongoose;

const ProjectSectionSchema = new Schema({
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    moduleName: { type: String, required: true },
    active: { type: Boolean, default: true },
    description: { type: String },
}, { timestamps: true });

export default mongoose.model('ProjectSection', ProjectSectionSchema);
// // active status, createdBy, and createdOn.
// // It also includes a reference to the User who created the project.