require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')


//express app
const app = express()

//middleware
app.use(express.json()) //checks if request has a body and attaches it to req object
app.use( (req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
// app.get('/', (req, res)=> {
//     res.json({msg: 'Welcome to the app'})
// })
//register routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })

    })
    .catch((error) => {
        console.log(error)
    })

