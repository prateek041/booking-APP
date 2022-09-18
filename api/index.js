import express from 'express';
const app = express();
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// importing routes.
import authRouter from './routes/auth.js'
import roomsRouter from './routes/rooms.js'
import hotelsRouter from './routes/hotels.js'
import usersRouter from './routes/users.js'
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
app.use(express.json()); // for sending json to the server.
app.use("/api/auth", authRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/users", usersRouter);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        msg: errorMessage,
        stack: err.stack,
    });
})

// app.get('/users', (req, res) => {
//     res.send("Hello this is me checking db")
// })

app.listen(8800, () => {
    connect()
    console.log("connected to port 8800!")
})