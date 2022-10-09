const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    type: {
        type: mongoose.Schema.Types.String,
        default: 'image',
        required: true
    },
    /**
     * User or Admin, depends who sent this image. Needed for html class.
     */
    ownerType: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    src: {
        type: String,
        trim: true
    },
    mimetype: {
        type: String
    },
    originalname: {
        type: String
    },
}, {
    timestamps: true
})

const Image = mongoose.model('Image', imageSchema)
module.exports = Image