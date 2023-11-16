import {WorkoutContext} from '../context/WorkoutContext'

import {useContext} from 'react'

//to ensure that the context is used in context
export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext)
    
    if (!context){
        throw Error('useWorkoutContext must be used inside a WorkoutContextProvider')
    }
    return context
}