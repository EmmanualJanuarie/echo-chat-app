import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next)=>{
    let token;

     // Check for token in the Authorization header
     if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Extract the token from the header
            token = req.headers.authorization.split(" ")[1];

            // Decode the token
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by ID and exclude the password field
            req.user = await User.findById(decodedToken.id).select("-password");
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
            return; // Exit the middleware
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
        return; // Exit the middleware
    }
});

export default protect;