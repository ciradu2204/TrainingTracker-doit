import weeklyPlans from '../models/weeklyPlans.js';
import  mongoose from 'mongoose';

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

export const updateWeeklyPlans = async (req, res) => {
  const { id: _id} = req.params; 
  const weeklyPlan = req.body; 

  //check if the id is valid
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Weekly Plan with that id')

  const updatedPost = await weeklyPlans.findByIdAndUpdate(_id, {... weeklyPlan, _id}, {new: true} )

   res.json(updatedPost)
}


export const deleteWeeklyPlan = async (req, res) => {

  const {id} = req.params
  
  //check if the id is valid 
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Weekly Plan with that id')

  await weeklyPlans.findByIdAndRemove(id); 

  res.json({message: 'Weekly Plan deleted successfully '})


}