import express from 'express'
import { createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from '../controllers/hotel.js';
import Hotel from '../models/Hotel.js';
const router = express.Router();

// imoprting error object creator.
// import createError from '../utils/error.js'

// CREATE, GET ALL
router.route('/').post(createHotel).get(getAllHotel);

// UPDATE, DELETE, GET
router.route('/:id').put(updateHotel).delete(deleteHotel).get(getHotel);

export default router;