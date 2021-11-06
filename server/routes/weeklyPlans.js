import express from  'express'; 
import { getWeeklyPlans, createWeeklyPlans } from '../controllers/weeklyPlans.js';
const router = express.Router(); 

router.get('/', getWeeklyPlans);
router.post('/', createWeeklyPlans);

export default router; 