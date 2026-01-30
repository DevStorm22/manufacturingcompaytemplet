import mongoose, {Schema, models, model} from "mongoose";
const AdminSchema = new Schema( {
    email: {
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type:String,
        required: true,
    },
    role: {
        type:String,
        default: "admin",
    },
}, { timestamps: true });

export const Admin = models.Admin || model("Admin", AdminSchema);