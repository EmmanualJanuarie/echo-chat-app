const express = require("express");
const connDB =  require('./config/db.js');
const chats = require('./data/data.js');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
connDB();

app.get("/", (req, res) => {
    res.send("Api Active...")
});

app.get('/api/chat', (req,res)=>{
    res.send(chats);
});

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log("Server on port 5000"));