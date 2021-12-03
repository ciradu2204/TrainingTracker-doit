import express from  'express'; 
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

//import   Route
import weeklyPlansRoutes from './routes/weeklyPlans.js';
import userRoutes from './routes/users.js';


//created the express app
const app = express(); 
dotenv.config()

app.use(express.json({extended: true})); 
app.use(express.urlencoded({extended:true})); 

app.use(cors());

app.get('/', (req, res) => {
  res.send("Welcome to Training Tracker App/doit API")
})

app.use('/weeklyPlans', weeklyPlansRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;

// connecting to databse, allowing useUnifiedTopology and useNewUrlParser to avoid warning in console
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(() => app.listen(PORT, () => console.log("server running on port 5000")))
  .catch((error) => console.log(error.message));

