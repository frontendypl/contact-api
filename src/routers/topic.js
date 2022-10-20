const express = require('express')

const Topic = require('../models/Topic')
const Message = require('../models/Message')
const Answer = require('../models/Answer')

const router = new express.Router()

const auth = require('../middleware/auth')

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

/**
 *  TODO: Add Auth Token
 */
// router.get('/topics', async (req, res)=>{
//     try{
//         const topics = await Topic.find()
//
//         return res.send(topics)
//     }catch (e) {
//
//     }
// })

/**
 *  TODO: Add Auth Token
 */
router.get('/chats', auth, async (req, res)=>{
    try{
        const topics = await Topic.find().sort({createdAt: -1})
        const messages = await Message.find()
        const answers = await Answer.find()

        const data = {}

        topics.forEach(({_id, source,createdAt})=>{

            data[_id] = {
                messages: [...messages.filter(el=>el.topic.toString() === _id.toString()),...answers.filter(el=>el.topic.toString() === _id.toString())]
                    .sort(function compare(a, b) {
                        const dateA = new Date(a.createdAt);
                        const dateB = new Date(b.createdAt);
                        return dateA - dateB;
                    }),
                source,
                createdAt,
                _id
            }

        })

        return res.send(data)
    }catch (e) {

    }
})


module.exports = router