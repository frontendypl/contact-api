const express = require('express')

const Message =require('../models/Message')

const router = new express.Router()

router.post('/messages',async (req, res)=>{

    const message = new Message({
        ...req.body
    })

    try {
        const newMessage = await message.save()
        res.status(201).send(newMessage)
    }catch (e) {
        res.status(400).send(e)
    }

})

module.exports = router