import mongoose from "mongoose";

//actor schema
const actorSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        trim: true
    },
    dob: {
        type: Date,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    }
});

const Actor = mongoose.model('Actor', actorSchema);
export { Actor };