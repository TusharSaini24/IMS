const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT

const authRoutes = require('./routes/auth')


app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

app.set('view engine','ejs')
app.set('views','views')

app.use('/', authRoutes)

app.get('*',(req,res) => {
    res.render('404')
})

app.listen(PORT,(req,res) => {
    console.log(`Server Connected At ${PORT}`);
})