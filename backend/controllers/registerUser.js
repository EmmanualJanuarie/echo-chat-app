import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../config/generateToken.js';
import { hash } from 'bcryptjs';

// Creating async function for user registration
const regUser = asyncHandler(async(req, res) =>{
    const {flname, email, password, pic, bio, tel} = req.body;

    console.log(req.body);

    // Throwing error if any of the  variables are undifiend
    if(!flname || !email || !password || !bio || !tel){
        return res.status(400).json({ message: 'Please populate all fields!' });
    }

    // Checkinf if user exists in database
    const userExists = await User.findOne({email});
    
    // Display error if user exists
    if(userExists){
        res.status(400);
        return res.status(400).json({ message: 'User Exists!' });
    }

    // Hash the password before saving
    const hashedPassword = await hash(password, 10);

    // the alternative if user does not exists
    const user = await User.create({
        flname,
        email,
        password: hashedPassword,
        bio, 
        tel,
        pic,
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            flname: user.flname,
            email: user.email,
            bio: user.bio,
            tel: user.tel,
            pic: user.pic,

            // generating token
            token: generateToken(user._id),
        });
    }else{
      return res.status(400).json({ message: 'User Creation Failed!' });
    }
});


// Creating the async function for authentication for user
const authUser  = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        console.log("User  not found");
        return res.status(401).json({ message: "Invalid email or password!" });
    }

    console.log("Stored hashed password:", user.password); // Log the stored hashed password
    console.log("Entered password:", password); // Log the entered password

    const isMatch = await user.matchPassword('$2b$10$QBwNXuCRcdqKEiW8zclowOL.s.VzfB.n.DEntjihY4pEHD3iMutYq');
    console.log("Password match result:", isMatch); // Log the result of the password comparison

    if (isMatch) {
        res.json({
            _id: user._id,
            flname: user.flname,
            email: user.email,
            bio: user.bio,
            tel: user.tel,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        console.log("Invalid password attempt");
        return res.status(401).json({ message: "Invalid email or password!" });
    }
});


// Creating the async function for updating user information
const updateUser  = asyncHandler(async (req, res) => {
    const { email } = req.params; // Get the email from the request parameters
    const { bio, flname, pic } = req.body; // Get the fields to update from the request body

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User  not found' });
    }

    // Update user fields
    user.bio = bio || user.bio; // Update bio if provided, otherwise keep existing
    user.flname = flname || user.flname; // Update full name if provided
    user.pic = pic || user.pic; // Update picture if provided

    // Save the updated user
    const updatedUser  = await user.save();

    // Respond with the updated user data
    res.json({
        _id: updatedUser._id,
        flname: updatedUser.flname,
        email: updatedUser.email,
        bio: updatedUser.bio,
        tel: updatedUser.tel,
        pic: updatedUser.pic,
    });
});

const resetPassword = asyncHandler(async (req, res) => {
    const { email } = req.params; // Get the email from the request parameters
    const { password } = req.body; // Get the fields to update from the request body

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User  not found' });
    }

    // Hash the new password before saving
    user.password = await hash(password, 10); // Hash the password with a salt round of 10

    // Save the updated user
    const resetedUserPwd = await user.save();

    // Respond with the updated user data
    res.json({
        _id: resetedUserPwd._id,
        flname: resetedUserPwd.flname,
        email: resetedUserPwd.email,
        bio: resetedUserPwd.bio,
        tel: resetedUserPwd.tel,
        pic: resetedUserPwd.pic,
    });
});
export default { regUser , authUser, updateUser } ;