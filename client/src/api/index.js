import axios from 'axios'

const url = 'https://trainingtracker-doit.herokuapp.com/weeklyPlans'; 

export const fetchWeeklyPlans = () => axios.get(url)

export const createWeeklyPlan = (newWeeklyPlan) => axios.post(url, newWeeklyPlan)

export const updateWeeklyPlan = (id, updatedWeeklyPlan) => axios.patch(`${url}/${id}`, updatedWeeklyPlan )

export const deleteWeeklyPlan = (id) => axios.delete(`${url}/${id}`); 

export const likeWeeklyPlan = (id) => axios.patch(`${url}/${id}/likeWeeklyPlan`);

export const markGoalComplete = (id, goalId, goalIndex) => axios.patch(`${url}/${id}/${goalId}/${goalIndex}/markGoalComplete`);