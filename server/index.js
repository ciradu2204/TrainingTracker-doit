const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 

const app = express(); 

app.use(express.json({extended: true})); 
app.use(express.urlencoded({extended:true})); 

app.use(cors());