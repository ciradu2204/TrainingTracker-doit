import mongoose from 'mongoose';

const weeklyPlansSchema = mongoose.Schema({
title: String, 
target:String, 
achieved: String

});

const weeklyPlans = mongoose.model('weeklyPlans', weeklyPlansSchema); 

export default weeklyPlans; 