import express from 'express';
import { Producer } from '../models/producer.js';

const router = express.Router();

//Api to add new Producer
router.post('/add', async (req, res) => {
    const { producerName, producerGender, producerDob, producerBio } = req.body;
    try {
        const newProducer = await new Producer({
            producerName,
            producerGender,
            producerDob,
            producerBio
        }).save();
        if (!newProducer) {
            return res.status(400).send({ error: "Error occured while saving the producer" })
        }
        res.status(201).json({ producer: newProducer, message: "Producer Details saved successfully" })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }

});

//API to get producer
router.get('/all',async(req,res)=>{
    try {
        const producer = await Producer.find()
        if (producer) {
            return res.status(202).json({ producer })
        }
        else {
            return res.status(400).send({ error: "Error occured while getting the Producers list" })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });

    }
})

export const producersRouter = router;