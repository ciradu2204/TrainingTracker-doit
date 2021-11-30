import express from  'express'; 
import { getWeeklyPlans, createWeeklyPlans, updateWeeklyPlans, deleteWeeklyPlan } from '../controllers/weeklyPlans.js';
const router = express.Router(); 

router.get('/', getWeeklyPlans);
router.post('/', createWeeklyPlans);
router.patch('/:id', updateWeeklyPlans)
router.delete('/:id', deleteWeeklyPlan)

export default router; 

