/* eslint-disable import/no-anonymous-default-export */
export default (weeklyPlans=[], action) => {

    switch(action.type){
        case 'FETCH_ALL':
          return action.payload;
        case 'CREATE': 
          return [...weeklyPlans, action.payload]
        case 'UPDATE': 
          return weeklyPlans.map((weeklyPlan) => weeklyPlan._id === action.payload._id? action.payload: weeklyPlan)
           
        default:
            return weeklyPlans
    }
}