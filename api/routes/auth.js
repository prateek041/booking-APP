import express from 'express'
const router = express.Router();

router.get('/', (req, res) => {
    res.send("The auth endpoint");
})

router.get('/register', (req, res) => {
    res.send('This is registration auth endpoint')
})

export default router;