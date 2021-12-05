import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5000' })

//pass the user token to the backend 

API.interceptors.request.use((req) =>{

    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})


//the different backend apis
export const fetchWeeklyPlans = () => API.get('/weeklyPlan')

export const createWeeklyPlan = (newWeeklyPlan) => API.post('/weeklyPlan', newWeeklyPlan)

export const updateWeeklyPlan = (id, updatedWeeklyPlan) => API.patch(`/weeklyPlan/${id}`, updatedWeeklyPlan )

export const deleteWeeklyPlan = (id) => API.delete(`/weeklyPlan/${id}`); 

export const likeWeeklyPlan = (id) => API.patch(`/weeklyPlan/${id}/likeWeeklyPlan`);

export const markGoalComplete = (id, goalId, goalIndex) => API.patch(`/weeklyPlan/${id}/${goalId}/${goalIndex}/markGoalComplete`);

export const addsharedWeeklyPlan = (id) => API.patch(`/weeklyPlan/${id}/addsharedWeeklyPlan`)

export const fetchSharedWeeklyPlan = (id) => API.get(`/weeklyPlan/${id}/fetchSharedPlan`)

export const fetchAllSharedPlansByUser = () => API.get('/weeklyPlan/fetchAllSharedPlans')

export const signIn = (formData)  => API.post('/user/signin', formData);

export const signUp = (formData) => API.post('/user/signup', formData);