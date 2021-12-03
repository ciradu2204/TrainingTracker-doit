import mongoose from "mongoose";

const weeklyPlansSchema = mongoose.Schema({
  weeklyPlanName: String,
  startDate: {
    type: Date,
    default: null,
  },
  likes: {
    type: [String], 
    default:  [], 
  },
  completedGoals:{
    type: Number, 
    default: 0
  },
  endDate: {
    type: Date,
    default: null,
  },
  repeat: {
    type: String,
    default: "None",
  },
  description: String,
  goals: [
    {
      goalName: String,
      date: {
        type: Date,
        default: null,
      },
      time: {
        type: Date,
        default: null,
      },
      target: {
        label: {
          type: String,
          default: "Times",
        },
        value: {
          type: Number,
          default: 0,
        },
      },
      achieved: {
        label: {
          type: String,
          default: "Times",
        },
        value: {
          type: Number,
          default: 0,
        },
      },
      completed:{
        type: Boolean, 
        default: false
      }
    },
  ],
  userName:{
    type: String, 
    required: true
  },
  creator: {
    type: String, 
    required: true
  }, 
});

const weeklyPlans = mongoose.model("weeklyPlans", weeklyPlansSchema);

export default weeklyPlans;
