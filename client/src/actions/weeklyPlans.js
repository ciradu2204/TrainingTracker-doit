import * as api from '../api';

//action creators

export const  getWeeklyPlans = () => async(dispatch) =>{

    try {
        const {data}  = await api.fetchWeeklyPlans();
        dispatch({type:'FETCH_ALL', payload: data}) 
    }catch (error){
        console.log(error)
    }

}

export const createWeeklyPlans = (weeklyPlan) => async(dispatch) => {

    try {
    
        const {data} = await api.createWeeklyPlan(weeklyPlan); 
         dispatch({type: "CREATE", payload: data})
    }catch (error){
        console.log(error)
    }

}

export const updateWeeklyPlans = (id, weeklyPlan) => async(dispatch) => {

    try{
        const {data}  = await api.updateWeeklyPlans(id, weeklyPlan); 

        dispatch({type: "UPDATE", payload: data })
    }catch(error){
        console.log(error)
    }

}

export const deleteWeeklyPlan = (id) => async(dispatch) => {
    
    try{
        await api.deleteWeeklyPlan(id)

        dispatch({type: 'DELETE', payload:id})

    }catch (error){
       console.log(error)
    }
}