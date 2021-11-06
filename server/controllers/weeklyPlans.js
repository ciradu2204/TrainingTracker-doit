import weeklyPlans from '../models/weeklyPlans.js';

// Get the different weekly plans
export const getWeeklyPlans = async (req, res) => {
    try{
        const weeklyPlansResponse = await weeklyPlans.find(); 

        //200 as the object is created and returned 
        res.status(200).json(weeklyPlansResponse);
    }catch (error){
         res.status(404).json({message: error.message})
    }
}

//Add a new weekly plan 
export const createWeeklyPlans = async (req, res) =>{
   const weeklyPlan = req.body;

   const newWeeklyPlan = new weeklyPlans(weeklyPlan); 

   try{
    await newWeeklyPlan.save()

    //201 as the object is created and only its reference is returned
    res.status(201).json(newWeeklyPlan); 
   }catch (error){
     res.status(409).json({message: error.message})
   }
}