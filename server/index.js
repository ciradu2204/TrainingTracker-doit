import express from  'express'; 
import mongoose from 'mongoose';
import cors from 'cors'

//import weeklyPlans Route
import weeklyPlansRoutes from './routes/weeklyPlans.js';

//created the express app
const app = express(); 

app.use(express.json({extended: true})); 
app.use(express.urlencoded({extended:true})); 

app.use(cors());

app.use('/weeklyPlans', weeklyPlansRoutes);

const CONNECTION_URL= 'mongodb+srv://CynthiaIradu:Imananibyose12@trainingtracker-doit.uhzdi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const PORT = process.env.PORT || 5000;

// connecting to databse, allowing useUnifiedTopology and useNewUrlParser to avoid warning in console
mongoose.connect(CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(() => app.listen(PORT, () => console.log("server running on port 5000")))
  .catch((error) => console.log(error.message));

