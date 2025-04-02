import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChatAppPage() {
    const [chats, setChats] = useState([]);

    const fetchChats = async() => {
        const data = await axios.get('/api/chat');
        console.log(data);
    };

    useEffect(() =>{
        fetchChats();
    }, []);
    return (
        <div>
            {chats.map((chat) =>{
                <div>{chat.chatName}</div>
            })}
        </div>
    );
}

export default ChatAppPage;