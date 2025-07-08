import mongoose from "mongoose";
const { Schema } = mongoose;

const TeamDetailSchema = new Schema({
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model('TeamDetail', TeamDetailSchema);
// This schema defines the structure of the TeamDetail document in MongoDB.
// It includes fields for teamId (reference to Team) and userId (reference to User).