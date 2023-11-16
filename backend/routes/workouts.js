const express = require('express')
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const requireAuth = require('../middleware/requireAuth')

//using express router instead of app.get
const router = express.Router()

//user require auth for all workout routes
router.use(requireAuth)

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