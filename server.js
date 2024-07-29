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

app.get('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const Chat = await Chat.findById(id);
        res.status(200).json(Chat);
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

// update a Chat
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Chat.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Chat.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a product

app.delete('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Chat.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
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