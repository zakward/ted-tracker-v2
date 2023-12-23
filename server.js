const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
require("dotenv").config()
const {expressjwt} = require("express-jwt")


const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB)
         console.log("Connected to the database")
        app.listen(process.env.PORT, () => console.log("Listening on port " + process.env.PORT))
    } catch (error) {
        console.log(error)
    }
}

connectToDB()

app.use(express.json())
app.use(morgan("dev"))

app.use("/api/auth", require("./routes/authRouter"))
app.use("/api/main", expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] }))
app.use("/api/main/ted", require("./routes/tedRouter"))
app.use("/api/main/reviews", require("./routes/reviewsRouter"))

app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})