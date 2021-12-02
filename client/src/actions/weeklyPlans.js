import * as api from '../api';
import { FETCH_ALL, DELETE, UPDATE, CREATE } from '../constants/actionTypes';

//action creators

export const  getWeeklyPlans = () => async(dispatch) =>{

    try {
        const {data}  = await api.fetchWeeklyPlans();
        dispatch({type:FETCH_ALL, payload: data}) 
    }catch (error){
        console.log(error)
    }

}

export const createWeeklyPlans = (weeklyPlan) => async(dispatch) => {

    try {
    
        const {data} = await api.createWeeklyPlan(weeklyPlan); 
         dispatch({type: CREATE, payload: data})
    }catch (error){
        console.log(error)
    }

}

export const updateWeeklyPlan = (id, weeklyPlan) => async(dispatch) => {

    try{
        const {data}  = await api.updateWeeklyPlan(id, weeklyPlan); 

        dispatch({type: UPDATE, payload: data })
    }catch(error){
        console.log(error)
    }

}

export const deleteWeeklyPlan = (id) => async(dispatch) => {
    
    try{
        await api.deleteWeeklyPlan(id)

        dispatch({type: DELETE, payload:id})

    }catch (error){
       console.log(error)
    }
}

export const likeWeeklyPlan = (id) => async(dispatch) => {

    try {
        const {data}  = await api.likeWeeklyPlan(id); 

        dispatch({type: UPDATE, payload: data})
     } catch (error) {
        console.log(error)
    }
}

export const markGoalComplete = (id, goalId, goalIndex) => async(dispatch) => {

    try{
        const {data} = await api.markGoalComplete(id, goalId, goalIndex)
        dispatch({type: UPDATE, payload: data})
    }catch(error){
        console.log(error)
    }
}