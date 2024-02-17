import express from 'express';
import { Actor } from '../models/actor.js';

const router = express.Router();

//Api to add new Actor
router.post('/add', async (req, res) => {

    const { name, gender, dob, bio } = req.body;

    try {
        const newActor = await new Actor({
            name,
            gender,
            dob,
            bio
        }).save();
        if (!newActor) {
            return res.status(400).send({ error: "Error occured while saving the actor" })
        }
        res.status(201).json({ actor: newActor, message: "Actor Details saved successfully" })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }

});

export const actorsRouter = router;