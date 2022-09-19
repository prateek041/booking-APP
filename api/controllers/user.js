// Before any of this happens, Authentication and Authorization using JWT already done.
import User from "../models/User.js"

// UPDATE
export const updateUser = async (req, res, next) => {
    try {
        const updateduser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json({
            status: "success",
            back: updateduser,
        });
    } catch (error) {
        next(error);
    }
}

// DELETE
export const deleteUser = async (req, res, next) => {
    try {
        const deleteduser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            back: deleteduser,
        });
    } catch (error) {
        next(error);
    }
}

// GET
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status: "success",
            back: user,
        });
    } catch (error) {
        next(error);
    }
}

// GET ALL
export const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "success",
            back: users,
        })
    } catch (error) {
        next(error);
    }
}