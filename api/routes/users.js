import express from 'express';
const router = express.Router();

// importing controllers.
import {
    updateUser, deleteUser, getAllUser, getUser
} from "../controllers/user.js"
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

router.route('/checkauth').get(verifyToken, (req, res) => {
    res.send('you are authenticated');
})

router.route('/authorization/:id').get(verifyUser, (req, res) => {
    res.send("Delete your account");
})

router.route('/checkAdmin').get(verifyAdmin, (req, res) => {
    res.send("You are admin, go ahead destroy everything")
})

router.route('/').get(getAllUser);
router.route('/:id').put(updateUser).get(getUser).delete(deleteUser);

export default router;