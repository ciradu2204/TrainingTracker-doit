const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 

const app = express(); 

app.use(express.json({extended: true})); 
app.use(express.urlencoded({extended:true})); 

app.use(cors());

const CONNECTION_URL= 'mongodb+srv://CynthiaIradu:Imananibyose12@trainingtracker-doit.uhzdi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const PORT = process.env.PORT || 5000;

// connecting to databse, allowing useUnifiedTopology and useNewUrlParser to avoid warning in console
mongoose.connect(CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(() => app.listen(PORT, () => console.log("server running on port 3000")))
  .catch((error) => console.log(error.message));

