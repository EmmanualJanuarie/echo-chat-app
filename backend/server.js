import express from "express";
import connDB from './config/db.js';
// import chats from './data/data.js';
import { config } from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

config();

const app = express();

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

app.listen(5000, console.log(`Server on listening: http://localhost:${PORT}`));