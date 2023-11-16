const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({createdAt: -1}) //find all using empty object
    res.status(200).json(workouts)
}

//get a single workout
const getWorkout = async(req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        //check if the id is of valid mongoose types
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}

//create a new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    //check to give better error messages
    let emptyFields = []
    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    //add doc to db
    try {
        const user_id = req.user._id //grab user id from request and add to workout document
        const workout = await Workout.create({title, load, reps, user_id}) 
        res.status(200).json(workout)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
    
}

//delete workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
    
}

//update workout
const updateWorkout = async(req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body //spread the content of the request.body and use them to update the item
    })

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout

}