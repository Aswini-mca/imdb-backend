import express, { Router } from 'express';
import { Producer } from '../models/producer.js';
import { Actor } from '../models/actor.js';
import { Movie } from '../models/movie.js';

const router = express.Router();

//Api to add new movie
router.post('/add', async (req, res) => {
    const { movieName, yearOfRelease, plot, poster, producer, actors } = req.body

    try {

        // Check if the producer exists in the database
        const existingProducer = await Producer.findOne({ producerName: producer });
        let producerId;
        if (existingProducer) {
            producerId = existingProducer._id;
            // Check if the movie already exists in the producer's movies list
            if (!existingProducer.movies.includes(movieName)) {
                existingProducer.movies.push(movieName);
                await existingProducer.save();
            }
        }
        else {
            return res.status(404).send({ error: "Producer details is not found in the DB kindly add producer details then again try to add new movie" })
        }

        // Check if the actors exist in the database by name
        const actorsId = [];
        for (const actorName of actors) {
            let actorId;
            const existingActor = await Actor.findOne({ actorName });
            if (existingActor) {
                actorId = existingActor._id;
                // Check if the movie already exists in the actor's movies list
                if (!existingActor.movies.includes(movieName)) {
                    existingActor.movies.push(movieName);
                    await existingActor.save();
                }
            } else {
                return res.status(404).send({ error: `${actorName} Actor details is not found in the DB kindly add actor details then again try to add new movie` })
            }
            actorsId.push(actorId);
        }

        // Create the new movie
        const newMovie = await new Movie({
            movieName,
            yearOfRelease,
            plot,
            poster,
            producer: producerId,
            actors: actorsId
        }).save();

        res.status(201).json({ movie: newMovie, message: "New Movie added successfully" })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }

});

//Api to get all movies
router.get('/all', async (req, res) => {
    try {
        const movies = await Movie.find().populate('actors producer', 'actorName producerName')
        if (movies) {
            return res.status(202).json({ movie: movies })
        }
        else {
            return res.status(400).send({ error: "Error occured while getting the movies list" })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });

    }
})

//Api to edit a movie
router.put('/edit/:id', async (req, res) => {
    const { movieName, yearOfRelease, plot, poster, producer, actors } = req.body
    try {
        const { id } = req.params
        // Check if the producer exists in the database
        const existingProducer = await Producer.findOne({ producerName: producer });
        if (!existingProducer) {
            return res.status(404).send({ error: "Producer details is not found in the DB kindly add producer details then again try to edit movie" })
        }
        // Check if the actors exist in the database by name
        const actorsId = [];
        for (const actorName of actors) {
            let actorId;
            const existingActor = await Actor.findOne({ actorName });
            if (existingActor) {
                actorId = existingActor._id;
            }
            else {
                return res.status(404).send({ error: `${actorName} Actor details is not found in the DB kindly add actor details then again try to edit movie` })
            }
            actorsId.push(actorId);
        }

        //update movie details
        const movie = await Movie.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    movieName,
                    yearOfRelease,
                    plot,
                    poster,
                    producer: existingProducer._id,
                    actors: actorsId
                }
            },
            { new: true }
        )
        return res.status(201).send({ movie:movie, message: "Updated movie details successfully" })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }

});

//Api to delete a movie
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    try {
        const movie = await Movie.findByIdAndDelete({ _id: id })
        if (!movie) {
            return res.status(400).send({ error: "Not able to delete" });
        }
        return res.status(200).send({ message: "Movie deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
})
export const moviesRouter = router;

//Api to get a movie by name
router.get('/movie-by-name/:movieName', async (req, res) => {
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