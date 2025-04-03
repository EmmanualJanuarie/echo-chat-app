import express from "express";
import connDB from './config/db.js';
import cors from 'cors';
// import chats from './data/data.js';
import { config } from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import User from "./models/userModel.js";

config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());    

connDB();

app.get("/", (req, res) => {
    res.send("Api Active...")
});

app.use('/api/user', userRoutes);

// ----------------------- Deploymeny Logic ---------------------------------


// ----------------------- Deploymeny Logic ---------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
console.log(PORT);

app.listen(PORT, console.log(`Server on listening: http://localhost:${PORT}`));