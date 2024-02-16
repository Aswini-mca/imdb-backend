import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = 9000;

//Inbuilt middleware
app.use(express.json());
app.use(cors());

//mongoDB connection
export async function dataBaseConnection() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017")
        console.log("Mongodb is connected")
    } catch (error) {
        console.log("Mongodb connection error")
    }
}
dataBaseConnection();

app.get('/', (req, res) => {
    res.send(' Welcome To IMDB App')
});

app.listen(PORT, () => console.log('The server started on the port', PORT))