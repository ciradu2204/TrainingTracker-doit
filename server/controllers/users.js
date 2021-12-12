import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from "../models/users.js";

export const signin = async(req, res) => {
   const  {email, password} =  req.body; 

   try {
       //check if the user exist
       const existingUser = await User.findOne({email})

       //if they don't exist, notify the user
       if(!existingUser) return res.status(404).json({message: "User does not exist in the database"})

       //check if the password is correct
       const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

       //if the password is not correct notify the user
       if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"})

       //create a token to allow user to login 
       const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"})

       // return back the user information and the token
       res.status(200).json({result: existingUser, token})
   } catch (error) {
       res.status(500).json({message: "Something went wrong"})
   }

}

export const signup = async(req, res) => {

    const {firstName, lastName, email, password, confirmPassword} = req.body

    try {
        //check if a user already exist
        const existingUser = await User.findOne({email})

        //if they exist notify the user
        if(existingUser) return res.status(400).json({message: "User already exist"})
        
        //if they don't exist check if the confirm password and password are the same
        if(password !== confirmPassword) return res.status(400).json({message: "The Passwords are not the same"})

        // hash the password for security
        const hashedPassword = await bcrypt.hash(password, 12)

        //create a user 
        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`})
         
        // return a token back to the user if the user successfully login 
        const token = jwt.sign({email: email, id: result._id}, 'test', {expiresIn: "1h"})

        res.status(200).json({result, token})


    } catch (error) {
        res.status(500).json({message: "Something went wrong"})

    }
    
}