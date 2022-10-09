const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    type: {
        type: mongoose.Schema.Types.String,
        default: 'message',
        required: true
    },
    content: {
        type: mongoose.Schema.Types.String,
        required: true
    }
}, {
    timestamps: true
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message