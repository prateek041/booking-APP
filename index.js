import express from 'express';
const app = express();
import dotenv from 'dotenv'
import mongoose from 'mongoose'
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

mongoose.connection.on("connected", () => {
    console.log("mongoDB Connected");
})

app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(8800, () => {
    connect()
    console.log("connected to port 8800!")
})