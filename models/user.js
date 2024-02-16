import mongoose from "mongoose";

//user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    confirmPassword: {
        type: String,
        trim: true
    }
});

const User = mongoose.model("User",userSchema);
export {User};