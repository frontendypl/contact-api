const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    type: {
        type: mongoose.Schema.Types.String,
        default: 'answer',
        required: true
    },
    content: {
        type: mongoose.Schema.Types.String,
        required: true
    }
}, {
    timestamps: true
})

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer