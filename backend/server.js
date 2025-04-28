import express from "express";
import connDB from './config/db.js';
import cors from 'cors';
import { config } from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import http from 'http'; // Import http module
import { Server } from "socket.io";
import mongoose from "mongoose";

config();

console.log("Mongoose models:", mongoose.models);

const app = express();
const server = http.createServer(app); // Create an HTTP server

app.use(cors({
    origin: process.env.CLIENT_URL, // Allow only this origin 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());    

connDB();

app.get("/", (req, res) => {
    res.send("Api Active...");
});

import './models/userModel.js';
import './models/messageModel.js';
import './models/chatModel.js';

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use("/api/message", messageRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

// Initialize Socket.IO with the HTTP server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", //matches client url
        methods: ["GET", "POST"],
        credentials: true,
    },
});



io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    console.log("User Connect: " , socket.id);
    
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User  Joined Room: " + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageReceived) => {
        try {
            var chat = newMessageReceived.chat;
            if (!chat.users) return console.log("chat.users not defined");
            chat.users.forEach((user) => {
                if (user._id == newMessageReceived.sender._id) return;
                socket.in(user._id).emit("message received", newMessageReceived);
            });
        } catch (error) {
            console.error("Error in new message event:", error.message);
        }
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`)
});