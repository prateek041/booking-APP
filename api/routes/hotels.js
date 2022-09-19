import express from 'express'
import { createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

// for verification.

// imoprting error object creator.
// import createError from '../utils/error.js'

// CREATE, GET ALL
router.route('/').post(verifyAdmin, createHotel).get(getAllHotel);

// UPDATE, DELETE, GET
router.route('/:id').put(verifyAdmin, updateHotel).delete(verifyAdmin, deleteHotel).get(getHotel);

export default router;