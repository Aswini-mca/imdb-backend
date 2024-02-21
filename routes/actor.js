import express from 'express';
import { Actor } from '../models/actor.js';

const router = express.Router();

//Api to add new Actor
router.post('/add', async (req, res) => {
    const { actorName, actorGender, actorDob, actorBio } = req.body;
    try {
        const newActor = await new Actor({
            actorName,
            actorGender,
            actorDob,
            actorBio
        }).save();
        if (!newActor) {
            return res.status(400).send({ error: "Error occured while saving the actor" })
        }
        res.status(201).json({ actor: newActor, message: "Actor Details saved successfully" })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }

});

//API to get actors
router.get('/all',async(req,res)=>{
    try {
        const actors = await Actor.find()
        if (actors) {
            return res.status(202).json({ actors })
        }
        else {
            return res.status(400).send({ error: "Error occured while getting the actors list" })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });

    }
})

export const actorsRouter = router;