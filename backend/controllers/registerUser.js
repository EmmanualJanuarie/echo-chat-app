import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../config/generateToken.js';

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

    // the alternative if user does not exists
    const user = await User.create({
        flname,
        email,
        password,
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
const authUser = asyncHandler(async(req, res) => {
    const {email , password} = req.body;

    const user  = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json({
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
        return res.status(401).json({ message: 'Invalid email or password!' });
    }
});
export default { regUser , authUser } ;