import axios from 'axios'

const url = 'http://localhost:5000/weeklyPlans'; 

export const fetchWeeklyPlans = () => axios.get(url)

export const createWeeklyPlan = (newWeeklyPlan) => axios.post(url, newWeeklyPlan)

export const updateWeeklyPlans = (id, updatedWeeklyPlan) => axios.patch(`${url}/${id}`, updatedWeeklyPlan )