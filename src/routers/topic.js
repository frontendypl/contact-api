const express = require('express')

const Topic = require('../models/Topic')
const Message = require('../models/Message')
const Answer = require('../models/Answer')

const router = new express.Router()

router.get('/test',(req,res)=>{
    return res.send('app works')
})

router.post('/topics',async (req, res)=>{

    const topic = new Topic({
        ...req.body
    })
    
    try {
        const newTopic = await topic.save()
        res.status(201).send(newTopic)
    }catch (e) {
        res.status(400).send(e)
    }

})

router.get('/topics/:id/chat', async (req, res) => {

    try {
        const messages = await Message.find({topic: req.params.id})
        const answers = await Answer.find({topic: req.params.id})

        const data = [...messages, ...answers]

        data.sort(function compare(a, b) {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateA - dateB;
        });

        res.send(data)
    } catch (e) {
        res.status(404).send()
    }

})

module.exports = router