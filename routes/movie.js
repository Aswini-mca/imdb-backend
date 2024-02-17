import express, { Router } from 'express';
import { Producer } from '../models/producer.js';
import { Actor } from '../models/actor.js';
import { Movie } from '../models/movie.js';

const router = express.Router();

//Api to add new movie
router.post('/add', async (req, res) => {
    const { name, yearOfRelease, plot, poster, producer, actors } = req.body
    const { producerName, producerGender, producerDob, producerBio } = req.body
    const { actorGender, actorDob, actorBio } = req.body

    try {
        // Check if the producer exists in the database
        const existingProducer = await Producer.findOne({ name: producer });
        let producerId;
        if (!existingProducer) {
            // If the producer does not exist, create a new producer
            const newProducer = await new Producer({
                name: producerName,
                gender: producerGender,
                dob: producerDob,
                bio: producerBio
            }).save();
            producerId = newProducer._id;
        }
        else {
            producerId = existingProducer._id;
        }

        // Check if the actors exist in the database by name
        const actorsId = [];
        for (const actorName of actors) {
            let actorId;
            const existingActor = await Actor.findOne({ name: actorName });
            if (existingActor) {
                actorId = existingActor._id;
            } else {
                // If any of the actor do not exist, create new actor
                const newActor = await new Actor({
                    name: actorName,
                    gender: actorGender,
                    dob: actorDob,
                    bio: actorBio
                }).save();
                actorId = newActor._id;
            }
            actorsId.push(actorId);
        }

        // Create the new movie
        const newMovie = await new Movie({
            name,
            yearOfRelease,
            plot,
            poster,
            producer:producerId,
            actors: actorsId
        }).save();

        res.status(201).json({ movie: newMovie, message: "New Movie added successfully" })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }

});

export const moviesRouter = router;