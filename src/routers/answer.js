const express = require('express')

const Answer =require('../models/Answer')

const router = new express.Router()

router.post('/answers',async (req, res)=>{

    if(req.body.secret !== 'majkel00'){
        return res.status(400).send('Unauthorized')
    }

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