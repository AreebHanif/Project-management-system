import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    designation: { type: String },
    image: { type: String },
    active: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
// This schema defines the structure of the User document in MongoDB.
// It includes fields for name, designation, password, email, image, and active status.