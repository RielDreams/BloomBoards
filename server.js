////////////////////
//PACKAGES
////////////////////
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
require('dotenv').config()


////////////////////
//intializing
////////////////////
const server = express()

////////////////////
//DATA
////////////////////
const meat = require('./models/meats')
const cheese = require('./models/cheese')
const addOns = require('./models/addOns')
const { urlencoded } = require('express')

////////////////////
//CONFIG
////////////////////
const PORT = process.env.PORT
const DATABASE_URI = process.env.DATABASE_URI

////////////////////
//MIDWARE
////////////////////
server.use(express.static('./public'))
server.use(methodOverride('_method'))
server.use(urlencoded({extended: true}))
mongoose.connect(DATABASE_URI)
const db = mongoose.connection

////////////////////
//SEED/CREATE
////////////////////
server.get('/createm', (req,res)=>{
    meat.create(req.body, (err)=>{
        console.log(meat)
    })
})

server.get('/createc', (req,res)=>{
    cheese.create(req.body, (err, c)=>{
        res.send(c)
    })
})

server.get('/createa', (req,res)=>{
    addOns.create(req.body, (err)=>{
        addOns.find({}, (err,find)=>{
            res.send(find)
        })
    })
})


////////////////////
//ROUTES
////////////////////

////////////////////
//INDEX
server.get('/', (req,res)=>{
    res.send('this is the home page')
})

server.get('/orders', (req,res)=> {
    res.send('this suppose to be a orders/cart page')
})

////////////////////
//NEW
server.get('/orders/new', (req, res)=>{
    res.send('this is the new orders page')
})


////////////////////
//DESTORY
server.delete('/orders/:id', (req,res)=> {
    console.log('this is the cancel order page')
})


////////////////////
//UPDATE
server.put('orders/:id', (req,res)=>{
    res.send('this is the updated page')
})

////////////////////
//CREATE
server.post('/orders', (req,res)=>{
    console.log('this is creating orders')
})

////////////////////
//EDIT
server.use('/orders/:id/edit', (req,res)=>{
    console.log('editting orders')
})


////////////////////
//SHOW 
server.get('/:id', (req, res)=>{
    res.send('this is the showing page')
})


////////////////////
//LISTENING
////////////////////
server.listen(PORT, () => {
    console.log(`BloomBoards is now online at ${PORT}`)
})