import weeklyPlans from "../models/weeklyPlans.js";
import mongoose from "mongoose";

// Get the different weekly plans
export const getWeeklyPlans = async (req, res) => {
  try {
  
    const weeklyPlansResponse = await weeklyPlans.find({creator: req.userId});
     //200 as the object is created and returned
    res.status(200).json(weeklyPlansResponse);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getWeeklyPlan = async (req, res) => {
  const {id} = req.params
  try{
    //check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
  return res.status(404).send("No Weekly Plan with that id");

   const weeklyPlan = await weeklyPlans.find({_id: id})
   res.status(200).json(weeklyPlan)
  }catch(error){
      res.status(404).json({message: error.message})
  }
}

export const getAllSharedWeeklyPlan = async(req, res) => {

   try{
    //find a weekly plan which has the user id as part of the usersWithAccess array
     const weeklyPlansResponse = await weeklyPlans.find({usersWithAccess: {$in: [req.userId]}})
    res.status(200).json(weeklyPlansResponse)
  }catch(error){
    res.status(404).json({message: error.message})
  }
  

}


//Add a new weekly plan
export const createWeeklyPlans = async (req, res) => {
  const weeklyPlan = req.body;
  const newWeeklyPlan = new weeklyPlans({...weeklyPlan, creator: req.userId});
   try {
    await newWeeklyPlan.save();
    
    //201 as the object is created and only its reference is returned
    res.status(201).json(newWeeklyPlan);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateWeeklyPlan = async (req, res) => {
  const { id: _id } = req.params;
  const weeklyPlan = req.body;

  //check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Weekly Plan with that id");

  const updatedPost = await weeklyPlans.findByIdAndUpdate(
    _id,
    { ...weeklyPlan, _id },
    { new: true }
  );

  res.json(updatedPost);
};

export const deleteWeeklyPlan = async (req, res) => {
  const { id } = req.params;

  //check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Weekly Plan with that id");

  await weeklyPlans.findByIdAndRemove(id);

  res.json({ message: "Weekly Plan deleted successfully " });
};

export const likeWeeklyPlan = async (req, res) => {
  const { id } = req.params;

  //check if the user is authenticated 

  if(!req.userId) return res.json({message: 'Unauthenticated'})

  //check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
  return res.status(404).send("No Weekly Plan with that id");

  const weeklyPlan = await weeklyPlans.findById(id)

  const index = weeklyPlan.likes.findIndex((id) => id === String(req.userId))

  if(index === -1 ){
    // A user can like the plan 
    weeklyPlan.likes.push(req.userId)
  }else{
    // A user dislike the plan 
    weeklyPlan.likes = weeklyPlan.likes.filter((id) => id !== String(req.userId))
  }

  const updatedWeeklyPlan = await weeklyPlans.findByIdAndUpdate(id, weeklyPlan, {new: true})
   res.json(updatedWeeklyPlan) 
};

export const markGoalComplete = async(req, res) => {
  const {id, goalId, goalIndex} = req.params
    //check if the id is valid
   if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(goalId) )
  return res.status(404).send("No Weekly Plan with that id");

  const weeklyPlan = await weeklyPlans.findById(id)
  const updatedWeeklyPlan = await weeklyPlans.findOneAndUpdate({"_id": id, "goals._id": goalId}, {$set:{"goals.$.achieved.value": weeklyPlan.goals[goalIndex].target.value, "goals.$.completed": true}, $inc:{"completedGoals": 1}}, {new: true})

  res.json(updatedWeeklyPlan)
}

export const shareWeeklyPlan = async(req, res) => {

  const {id } = req.params

  //find the weeklyplan by id 
  const weeklyPlan = await weeklyPlans.find({_id:id });
 
  if(!weeklyPlan) return res.status(404).message("No weekly plan with that id")
  // check to see if the creator is not the same as the user id 

  if(weeklyPlan.creator === req.userId){
   return  res.status(400).message("You are the creator of the shared weekly plan")
  }

  const updatedWeeklyPlan = await weeklyPlans.findOneAndUpdate({_id: id}, {$push: {usersWithAccess: req.userId }})
  // if not then add the userId to the user having access to the plan

  res.json(updatedWeeklyPlan)
}


