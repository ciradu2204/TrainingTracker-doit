import express from  'express'; 
import { getWeeklyPlans, createWeeklyPlans, updateWeeklyPlan, deleteWeeklyPlan, likeWeeklyPlan, markGoalComplete } from '../controllers/weeklyPlans.js';
const router = express.Router(); 

router.get('/', getWeeklyPlans);
router.post('/', createWeeklyPlans);
router.patch('/:id', updateWeeklyPlan)
router.delete('/:id', deleteWeeklyPlan)
router.patch('/:id/likeWeeklyPlan', likeWeeklyPlan)
router.patch('/:id/:goalId/:goalIndex/markGoalComplete', markGoalComplete)

export default router; 

