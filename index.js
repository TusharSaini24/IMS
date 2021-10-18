const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT

const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin')


app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

app.set('view engine','ejs')
app.set('views','views')

app.use('/', authRoutes)
app.use('/', adminRoutes)

app.get('*',(req,res) => {
    res.render('404')
})

mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("Database Connected");
                app.listen(PORT,() => {
                    console.log(`Server Connected at ${PORT}`);
                })
        })
        .catch((err) => {console.log(err),process.exit(0);})