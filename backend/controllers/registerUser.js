import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../config/generateToken.js';
import { compare, hash } from 'bcryptjs';

// User Registration
const regUser = asyncHandler(async (req, res) => {
    console.log("Received registration data:", req.body); // Debugging line

    const { flname, email, password, pic, bio, tel } = req.body;

    // Basic validations
    if (!flname || !email || !password || !bio || !tel) {
        return res.status(400).json({ message: 'Please populate all fields!' });
    }

    // Debugging email type and value
    console.log("Email type before validation:", typeof email); 
    console.log("Email value before validation:", email);

    // Additional validation for email
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'Email must be a valid string' });
    }

    if (email.length > 50) {
        return res.status(400).json({ message: 'Email is greater than 50 characters' });
    }

    const normalizedEmail = email.toLowerCase();

    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists!' });
    }

    const hashedPassword = await hash(password, 10);

    const user = await User.create({
        flname,
        email: normalizedEmail,
        password: hashedPassword,
        bio,
        tel,
        pic,
    });

    if (user) {
        return res.status(201).json({
            _id: user._id,
            flname: user.flname,
            email: user.email,
            isAdmin: user.isAdmin,
            bio: user.bio,
            tel: user.tel,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        return res.status(400).json({ message: 'User creation failed!' });
    }
});

// User Login (Authentication)
const authUser = asyncHandler(async (req, res) => {
    console.log("Login request:", req.body); // Debugging line

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Additional validation for email
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'Email must be a valid string' });
    }

    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email:  normalizedEmail });

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = user.matchPassword(password); //please add 'await' removed for chat purposes

    //debugging to check is passwords are the same
    console.log("Db Password: ", user.password)
    console.log("Entered Password: ", password)
    console.log("Is the password match?", isMatch);

    if (!isMatch) {
        return res.status(401).json({ message: "Password does not match what's in the database" });
    }

    res.json({
        _id: user._id,
        flname: user.flname,
        email: user.email,
        isAdmin: user.isAdmin,
        bio: user.bio,
        tel: user.tel,
        pic: user.pic,
        token: generateToken(user._id),
    });
});

// Search Users
const searchUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { flname: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ]
        }
        : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
});

// Update User Info
const updateUser = asyncHandler(async (req, res) => {
    const { email } = req.params;
    const { bio, flname, pic } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.bio = bio || user.bio;
    user.flname = flname || user.flname;
    user.pic = pic || user.pic;

    const updatedUser = await user.save();

    res.json({
        _id: updatedUser._id,
        flname: updatedUser.flname,
        email: updatedUser.email,
        bio: updatedUser.bio,
        tel: updatedUser.tel,
        pic: updatedUser.pic,
    });
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
    const { email } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.password = await hash(password, 10);

    await user.save();

    res.json({ message: "Password reset successfully" });
});

export default { regUser, authUser, updateUser, searchUsers, resetPassword };

