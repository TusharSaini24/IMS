const express = require('express')
const app = express()
const mongoose = require('mongoose')


require('dotenv').config()

const PORT = process.env.PORT

app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

app.set('view engine','ejs')
app.set('views','views')

app.get('/',(req,res) => {
    res.send("<h1>Hello</h1>")
})

app.listen(PORT,(req,res) => {
    console.log(`Server Connected At ${PORT}`);
})