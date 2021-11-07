import express from  'express'; 
import { getWeeklyPlans, createWeeklyPlans, updateWeeklyPlans } from '../controllers/weeklyPlans.js';
const router = express.Router(); 

router.get('/', getWeeklyPlans);
router.post('/', createWeeklyPlans);
router.patch('/:id', updateWeeklyPlans)

export default router; 