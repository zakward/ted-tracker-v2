const express = require('express')
const mongoose = require('mongoose')
const ted = require("../models/Ted")
const User = require("../models/User")
const review = require("../models/Review")
const tedRouter = express.Router()

tedRouter.get("/", async(req, res, next) => {
    try {
        const foundTed = await ted.find()
        return res.status(200).send(foundTed)
        
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

tedRouter.post("/", async (req, res, next) => {
    try {
        req.body.userId = req.auth._id
        const newTed = new ted(req.body)
        const savedTed = await newTed.save()
        const reviews = await review.find({tedId: savedTed._id})
        const tedWithReviews = {...savedTed.toObject(), reviews}
        return res.status(201).send(tedWithReviews)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})


tedRouter.get("/tedWithReviews", async (req, res, next) => {
    try {
        const foundTed = await ted.find()
        const tedWithReviews = await Promise.all(foundTed.map(async (ted) => {
            const reviews = await review.find({tedId: ted._id}).populate("author", "-password")
            const users = await User.findOne({_id: ted.userId})
            return {
                ...ted.toObject(),
                reviews: reviews,
                users: users.withoutPassword()
            }
        }))
        return res.status(200).send(tedWithReviews)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})


module.exports = tedRouter