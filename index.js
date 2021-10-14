const express = require('express')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT

app.get('/',(req,res) => {
    res.send("<h1>Hello</h1>")
})

app.listen(PORT,(req,res) => {
    console.log(`Server Connected At ${PORT}`);
})