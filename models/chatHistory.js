const mongoose = require('mongoose')

const chatSchema = mongoose.Schema(
    {
        prompt: {
            type: String,
            required: true,
        },
        AI: {
            type: Boolean,
            required: true,
            default: 0
        },
        
    },
    {
        timestamps: true
    }
)


const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;