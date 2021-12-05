import express from  'express'; 
import { getWeeklyPlans, createWeeklyPlans, updateWeeklyPlan, deleteWeeklyPlan, likeWeeklyPlan, markGoalComplete, shareWeeklyPlan, getWeeklyPlan, getAllSharedWeeklyPlan } from '../controllers/weeklyPlans.js';
const router = express.Router(); 

import auth from '../middleware/auth.js'

router.get('/', auth,  getWeeklyPlans);
router.get('/:id/fetchSharedPlan', auth, getWeeklyPlan )
router.get('/fetchAllSharedPlans', auth, getAllSharedWeeklyPlan)
router.post('/', auth, createWeeklyPlans);
router.patch('/:id', auth, updateWeeklyPlan)
router.delete('/:id', auth,  deleteWeeklyPlan)
router.patch('/:id/likeWeeklyPlan', auth,  likeWeeklyPlan)
router.patch('/:id/:goalId/:goalIndex/markGoalComplete', auth,  markGoalComplete)
router.patch('/:id/addsharedWeeklyPlan', auth,  shareWeeklyPlan)

export default router; 

