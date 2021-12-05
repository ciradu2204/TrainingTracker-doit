/* eslint-disable import/no-anonymous-default-export */

import {FETCH_MYPLANS, CREATE, UPDATE, DELETE, FETCH_SHAREDPLAN, FETCH_ALLSHAREDPLANS, UPDATE_OTHERS} from '../constants/actionTypes'

export default (state={myWeeklyPlans:[], othersWeeklyPlans:[], sharedPlan: null}, action) => {

    switch(action.type){
        case FETCH_MYPLANS:
          return {...state, myWeeklyPlans:[...action.payload]};
        case CREATE: 
          return {...state, myWeeklyPlans: [...state.myWeeklyPlans, action.payload]}
        case UPDATE: 
          return {...state, myWeeklyPlans: [...state.myWeeklyPlans.map((weeklyPlan) => weeklyPlan._id === action.payload._id? action.payload: weeklyPlan)]}
        case DELETE: 
          return {...state, myWeeklyPlans: [...state.myWeeklyPlans.filter((weeklyPlan) => weeklyPlan._id !== action.payload)]}
        case FETCH_SHAREDPLAN:
          return  {...state, sharedPlan: {...action?.data }}
        case UPDATE_OTHERS: 
          return {...state, othersWeeklyPlans: [...state.othersWeeklyPlans.map((otherWeeklyPlan) => otherWeeklyPlan._id === action?.data? action.data: otherWeeklyPlan )]}
        case FETCH_ALLSHAREDPLANS: 
          return {...state, othersWeeklyPlans:[...action.payload] }
        default:
            return state
    }
}