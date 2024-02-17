import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'
import { usersRouter } from './routes/user.js';
import { producersRouter } from './routes/producer.js';
import { actorsRouter } from './routes/actor.js';
import { moviesRouter } from './routes/movie.js';
import { isAuthenticated } from './auth.js';

const app = express();
const PORT = 9000;

//Inbuilt middleware
app.use(express.json());
app.use(cors());

//mongoDB connection
export async function dataBaseConnection() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/IMDB")
        console.log("Mongodb is connected")
    } catch (error) {
        console.log("Mongodb connection error")
    }
}
dataBaseConnection();

app.get('/', (req, res) => {
    res.send(' Welcome To IMDB App')
});

app.use('/user', usersRouter);
app.use('/actor', isAuthenticated, actorsRouter);
app.use('/producer', isAuthenticated, producersRouter);
app.use('/movie', isAuthenticated, moviesRouter);

app.listen(PORT, () => console.log('The server started on the port', PORT))