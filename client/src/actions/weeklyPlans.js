import * as api from '../api';

//action creators

export const  getWeeklyPlans = () => async(dispatch) =>{

    try {
        const {data}  = await api.fetchWeeklyPlans();
        dispatch({type:'FETCH_ALL', payload: data}) 
    }catch (error){
        console.log(error.message)
    }

}