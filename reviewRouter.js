const express = require('express')
const mongoose = require('mongoose')
const Review = require("./models/Review")

commentRouter.post("/:tedId", async (req, res, next) => {
    try {
        req.body.issue = req.params.tedId
        const newComment = new Comment(req.body)
        const savedComment = await newComment.save()
        return res.status(201).send(savedComment)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

commentRouter.get("/", async (req, res, next) => {
    try {
        const reviews = await Review.find()
        return res.status(200).send(comments)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})
