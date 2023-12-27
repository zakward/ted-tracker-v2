const mongoose = require('mongoose');
const express = require('express');
const Review = require("../models/Review");
const User = require("../models/User");

const reviewRouter = express.Router()


reviewRouter.get("/", async (req, res, next) => {
    try {
        const reviews = await Review.find().populate("author")
        return res.status(200).send(reviews)
    } catch (error) {
        res.status(500)
    }
})

reviewRouter.post("/:tedId", async (req, res, next) => {
    try {
        req.body.author = req.auth._id
        req.body.tedId = req.params.tedId
        const newReview = new Review(req.body)
        const savedReview = await newReview.save()
        return res.status(201).send(savedReview)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

reviewRouter.get("/:tedId", async (req, res, next) => {
    try {
        const reviews = await Review.find({tedId: req.params.tedId})
        return res.status(200).send(reviews)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

reviewRouter.delete('/:tedId', async (req, res, next) => {
    try{
        const deletedReview = await Review.findOneAndDelete({_id: req.params.tedId, author: req.auth._id})
        return res.status(200).send(`Review Deleted: ${deletedReview}`)
    } catch(err){
        res.status(500)
        return next(err)
    }
})




module.exports = reviewRouter;