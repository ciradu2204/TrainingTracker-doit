import axios from 'axios'

const url = 'http://localhost:5000/weeklyPlans'; 

export const fetchWeeklyPlans = () => axios.get(url)

export const createPost = (newPost) => axios.post(url, newPost)