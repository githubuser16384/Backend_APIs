const express = require('express')
const mongoose = require('mongoose')
const Chat = require('./models/chatHistory')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/', (req, res) => {
    res.send('Welcome to Chat History Demo')
})


app.get('/chathistory', async(req, res) => {
    try {
        const chats = await Chat.find({});
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



app.post('/chathistory', async(req, res) => {
    try {
        const chat = await Chat.create(req.body)
        res.status(200).json(chat);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


mongoose.set("strictQuery", false)
mongoose.
connect('mongodb://localhost:27017/test')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})