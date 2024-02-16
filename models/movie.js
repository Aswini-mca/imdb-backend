import mongoose from "mongoose";

//movie schema
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    yearOfRelease: {
        type: Number,
        trim: true
    },
    plot: {
        type: String,
        trim: true
    },
    poster: {
        type: String,
        trim: true
    },
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor'
    }],
    producer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producer',
        trim: true
    },
});

const Movie = mongoose.model('Movie', movieSchema);
export { Movie };