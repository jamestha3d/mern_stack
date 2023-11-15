const express = require('express')
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

//using express router instead of app.get
const router = express.Router()

//GET all workouts
router.get('/', getWorkouts)

//GET single workout
router.get('/:id', getWorkout)

//POST single workout
router.post('/', createWorkout)

//DELETE single workout
router.delete('/:id', deleteWorkout)

//UPDATE single workout
router.patch('/:id', updateWorkout)

module.exports = router