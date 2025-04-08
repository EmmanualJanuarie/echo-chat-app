import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import PopUp from "./PopUp";
import UserChats from "./UserContext/UserChats";
import { getSender } from "../utils/chatSender";

const MyChats = ({props}) => {
    const [loggedUser , setLoggedUser ] = useState();
    const [popUpContent, setPopUpContent] = useState('');
    const [popUpPosition, setPopUpPosition] = useState('');
    const [popUpColor, setPopUpColor] = useState('');
    const [showPopUp, setShowPopUp] = useState(false);

    const showPopUpMessage = (content, color, position) => {
        setPopUpContent(content);
        setPopUpColor(color);
        setPopUpPosition(position);
        setShowPopUp(true);
        setTimeout(() => setShowPopUp(false), 4000); // Hide after 4 seconds
    };

    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

    const fetchChats = async () => {
        if (!user || !user.token) {
            console.error("User is not defined or token is missing");
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`http://localhost:5000/api/chat`, config);
            console.log("what dat looks like: " , data);
            setChats(data);
        } catch (error) {
            showPopUpMessage('Failed to load chats!', 'yellow');
        }
    };

    const getOtherUser  = (users, loggedUser ) => {
        // Check if users is defined and is an array
        if (!Array.isArray(users) || !loggedUser ) {
            console.error("Invalid users or loggedUser :", users, loggedUser );
            return null; // or handle this case as needed
        }

        return users.find(user => user._id !== loggedUser ._id);
    };

    useEffect(() => {
        console.log("Fetched chats:", chats);
    }, [chats]);

    // Fetch logged user and chats when component mounts
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            setLoggedUser (userInfo);
            fetchChats();
        }
    }, []);

    return (
        <div>
            {showPopUp && <PopUp content={popUpContent} color={'black'} backgroundColor={popUpColor} position={popUpPosition} />}
            <div style={{backgroundColor: 'lightgray'}}>
            {chats ? (
         <div>
            {chats.map((chat) => (
            <UserChats  onClick={() => setSelectedChat(chat)}
            backgroundColor={'lightgray'}
            key={chat._id}
                // user={user}
                chat={chat}
                loggedUser ={loggedUser}
                user={getOtherUser (chat.users, loggedUser )} // Pass the other user
            >
                <div>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </div>
                {chat.latestMessage && (
                  <p>
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </p>
                )}
              </UserChats>
            ))}
          </div>
        ) : (
            null
        )}
            </div>
        </div>
    );
};

export default MyChats;