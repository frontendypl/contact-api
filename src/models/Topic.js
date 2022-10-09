const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
    /**
     * Page message Come from e.g. ucze.net, wegiel, informatyka-tychy etc...
     */
    source: {
        type: mongoose.Schema.Types.String,
        required: true
    }
}, {
    timestamps: true
})

const Topic = mongoose.model('Topic', topicSchema)
module.exports = Topic