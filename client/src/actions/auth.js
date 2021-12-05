import * as api from '../api';
import {AUTH, SIGNINERROR, SIGNUPERROR} from '../constants/actionTypes';

export const signin = (formData, navigate, state) => async(dispatch) => {

    try {
        const {data} = await api.signIn(formData); 
         
        dispatch({type: AUTH, data})
        navigate(state || "/dashboard/overview")

    } catch (error) {
        const errorMessage = {error}
        dispatch({type: SIGNINERROR, errorMessage})
    }

}

export const signup = (formData, navigate, state) => async(dispatch) => {

    try {
        const {data} = await api.signUp(formData); 
         dispatch({type: AUTH,  data})
         navigate(state || "/dashboard/overview")
        } catch (error) {
        const errorMessage = {error}
        dispatch({type: SIGNUPERROR, errorMessage})
    }

}