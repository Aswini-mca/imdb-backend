import mongoose from "mongoose";

//producer schema
const producerSchema = new mongoose.Schema({
    producerName: {
        type: String,
        trim: true
    },
    producerGender: {
        type: String,
        trim: true
    },
    producerDob: {
        type: Date,
        trim: true
    },
    producerBio: {
        type: String,
        trim: true
    },
    movies: [{
        type: String,
        trim: true
    }]
});

const Producer = mongoose.model('Producer', producerSchema);
export { Producer };