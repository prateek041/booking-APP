import Hotel from "../models/Hotel.js";


// CREATE
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save(); // saves the new hotel in the database.
        res.status(200).json({
            status: "success",
            back: savedHotel
        })
    } catch (error) {
        next(error);
    }
}

// UPDATE
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json({
            status: "success",
            back: updatedHotel,
        });
    } catch (error) {
        next(error);
    }
}

// DELETE
export const deleteHotel = async (req, res, next) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            back: deletedHotel,
        });
    } catch (error) {
        next(error);
    }
}

// GET
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json({
            status: "success",
            back: hotel,
        });
    } catch (error) {
        next(error);
    }
}

// GET ALL
export const getAllHotel = async (req, res, next) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json({
            status: "success",
            back: hotels,
        })
    } catch (error) {
        next(error);
    }
}