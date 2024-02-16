import mongoose from "mongoose";

//producer schema
const producerSchema = new mongoose.Schema({
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

const Producer = mongoose.model('Producer', producerSchema);
export { Producer };