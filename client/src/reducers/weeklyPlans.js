/* eslint-disable import/no-anonymous-default-export */

import {FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes'

export default (weeklyPlans=[], action) => {

    switch(action.type){
        case FETCH_ALL:
          return action.payload;
        case CREATE: 
          return [...weeklyPlans, action.payload]
        case UPDATE: 
          return weeklyPlans.map((weeklyPlan) => weeklyPlan._id === action.payload._id? action.payload: weeklyPlan)
        case DELETE: 
          return weeklyPlans.filter((weeklyPlan) => weeklyPlan._id !== action.payload)
        default:
            return weeklyPlans
    }
}