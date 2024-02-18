import mongoose from "mongoose";

//actor schema
const actorSchema = new mongoose.Schema({
    actorName: {
        type: String,
        trim: true
    },
    actorGender: {
        type: String,
        trim: true
    },
    actorDob: {
        type: Date,
        trim: true
    },
    actorBio: {
        type: String,
        trim: true
    },
    movies: [{
        type: String,
        trim: true
    }]
});

const Actor = mongoose.model('Actor', actorSchema);
export { Actor };