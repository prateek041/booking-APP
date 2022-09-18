import express from 'express'
import Hotel from '../models/Hotel.js';
const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save(); // saves the new hotel in the database.
        res.status(200).json(savedHotel)
    } catch (error) {
        res.status(500).json(error);
    }
})

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }); // saves the new hotel in the database and {new:true} returns the new doc.
        res.status(200).json(updatedHotel)
    } catch (error) {
        res.status(500).json(error);
    }
})

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id); // saves the new hotel in the database and {new:true} returns the new doc.
        res.status(200).json({
            msg: "success"
        })
    } catch (error) {
        res.status(500).json(error);
    }
})

// GET
router.get('/:id', async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id); // saves the new hotel in the database.
        res.status(200).json(hotel)
    } catch (error) {
        next(error)
    }
})

// GETALL
router.get('/', async (req, res, next) => {
    try {
        const allHotel = await Hotel.find();
        res.status(200).json(allHotel);
    } catch (err) {
        next(err)
    }
})

export default router;