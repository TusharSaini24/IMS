const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

require('dotenv').config()

var store = new MongoDBStore({
    uri: process.env.MONGO_LIVE,
    collection: 'sessions'
  });


const PORT = process.env.PORT

const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin')
const facultyRoutes = require('./routes/faculty')
const studentRoutes = require('./routes/student')


app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

app.set('view engine','ejs')
app.set('views','views')

app.use(session({
    secret: 'This is a secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: false,
    saveUninitialized: false
  }));



app.use('/', authRoutes)
app.use('/', adminRoutes)
app.use('/', facultyRoutes)
app.use('/', studentRoutes)

app.get('*',(req,res) => {
    res.render('404')
})

mongoose.connect(process.env.MONGO_LIVE)
        .then(() => {
            console.log("Database Connected");
                app.listen(PORT,() => {
                    console.log(`Server Connected at ${PORT}`);
                })
        })
        .catch((err) => {console.log(err),process.exit(0);})