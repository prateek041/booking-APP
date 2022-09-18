import express from 'express';
const app = express();
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// importing routes.
import authRouter from './routes/auth.js'
import roomsRouter from './routes/rooms'
import hotelsRouter from './routes/rooms'
import usersRouter from './routes/rooms'
dotenv.config()

// connecting to the DB.
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('connected to the db');
    } catch (error) {
        throw error;
    }
}

// if the inital connection is correct, then it will keep reconnecting to the DB
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");
})

// middlewares.
app.use("/api/auth", authRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/users", usersRouter);

// app.get('/users', (req, res) => {
//     res.send("Hello this is me checking db")
// })

app.listen(8800, () => {
    connect()
    console.log("connected to port 8800!")
})