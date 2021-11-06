import mongoose from 'mongoose';

const weeklyPlansSchema = mongoose.Schema({
title: String, 
description: String,
startDate: Date,
endDate: Date,
creator: {
type: String, 
default: "me", 
},
repeat:{
type: String,
default: "none" 
},
goals: [{
name: String,
day : String, 
time: Date, 
target: [{type: String, value: Number }],
achieved:[{type:String, value: Number }]
}]
});

const weeklyPlans = mongoose.model('weeklyPlans', weeklyPlansSchema); 

export default weeklyPlans; 