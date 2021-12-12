import * as api from '../api';
import { FETCH_MYPLANS, DELETE, UPDATE, CREATE, UPDATE_OTHERS, FETCH_SHAREDPLAN, FETCH_ALLSHAREDPLANS, LOADING, LOADED } from '../constants/actionTypes';

//action creators

export const  getWeeklyPlans = () => async(dispatch) =>{

    try {
        dispatch({type: LOADING})
        const {data}  = await api.fetchWeeklyPlans();
        dispatch({type: LOADED})

        dispatch({type:FETCH_MYPLANS, payload: data}) 
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



export const addsharedWeeklyPlan = (id) => async(dispatch) => {

    try{

        const {data} = await api.addsharedWeeklyPlan(id)
        dispatch({type: UPDATE_OTHERS, data })

    }catch(error){
        console.log(error)
    }

}

export const getSharedWeeklyPlan = (id) => async(dispatch) => {

    try{
    dispatch({type: LOADING})
    const {data} = await api.fetchSharedWeeklyPlan(id)
    dispatch({type: LOADED})
     dispatch({type: FETCH_SHAREDPLAN, data})
    }catch(error){
        console.log({error})
    }
}

export const getAllSharedWeeklyPlanPerUser = () => async(dispatch) => {
    try{
        dispatch({type: LOADING})
        const {data} = await api.fetchAllSharedPlansByUser()
         dispatch({type: LOADED})
        dispatch({type: FETCH_ALLSHAREDPLANS, payload: data})
    }catch(error){
     console.log({error})
    }
}