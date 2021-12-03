import express from  'express'; 
import { getWeeklyPlans, createWeeklyPlans, updateWeeklyPlan, deleteWeeklyPlan, likeWeeklyPlan, markGoalComplete } from '../controllers/weeklyPlans.js';
const router = express.Router(); 

import auth from '../middleware/auth.js'

router.get('/', auth,  getWeeklyPlans);
router.post('/', auth,  createWeeklyPlans);
router.patch('/:id', auth, updateWeeklyPlan)
router.delete('/:id', auth,  deleteWeeklyPlan)
router.patch('/:id/likeWeeklyPlan', auth,  likeWeeklyPlan)
router.patch('/:id/:goalId/:goalIndex/markGoalComplete', auth,  markGoalComplete)

export default router; 

