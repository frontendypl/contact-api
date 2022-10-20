const express = require('express')

const Answer =require('../models/Answer')

const router = new express.Router()

const auth = require('../middleware/auth')

router.post('/answers', auth, async (req, res)=>{

    const answer = new Answer({
        ...req.body
    })

    try {
        const newAnswer = await answer.save()
        res.status(201).send(newAnswer)
    }catch (e) {
        res.status(400).send(e)
    }

})

module.exports = router