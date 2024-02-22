import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'
import { usersRouter } from './routes/user.js';
import { producersRouter } from './routes/producer.js';
import { actorsRouter } from './routes/actor.js';
import { moviesRouter } from './routes/movie.js';
import { isAuthenticated } from './auth.js';
import { Movie } from './models/movie.js';

const app = express();
const PORT = 9000;

//Inbuilt middleware
app.use(express.json());
app.use(cors());

//mongoDB connection
export async function dataBaseConnection() {
    let MONGO_URL = process.env.MONGO_URL
    let DB_NAME = process.env.DB_Name
    try {
        await mongoose.connect(MONGO_URL,{ dbName:DB_NAME})
        console.log("Mongodb is connected")
    } catch (error) {
        console.log("Mongodb connection error")
    }
}
dataBaseConnection();

app.get('/', (req, res) => {
    res.send(' Welcome To IMDB App')
});

//Api to get a movie by name without token
app.get('/movie-by-name/:movieName', async (req, res) => {
    const { movieName } = req.params
    try {
        const movie = await Movie.findOne({ movieName }).populate('actors producer', 'actorName producerName')
        if (!movie) {
            return res.status(400).send({ error: "Movie is not availble in DB" });
        }
        return res.status(200).json({ movie: movie });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });

    }
})

app.use('/user', usersRouter);
app.use('/actor', isAuthenticated, actorsRouter);
app.use('/producer', isAuthenticated, producersRouter);
app.use('/movie', isAuthenticated, moviesRouter);

app.listen(PORT, () => console.log('The server started on the port', PORT))