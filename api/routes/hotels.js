import express from 'express'
const router = express.Router();

// CREATE
const createHotel = () => {
    try {
        console.log('created new hotel');
    } catch (error) {
        console.log(error)
    }
}

// UPDATE
// DELETE
// GET
// GETALL

export default router;