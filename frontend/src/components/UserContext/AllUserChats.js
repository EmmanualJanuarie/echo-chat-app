import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import Card from "../chatPageComponents/Card";
import Columns from "../Columns";
import Column from "../Column";
import Heading from "../chatPageComponents/Heading";
import '../../styles/UserItems.css';
import { getSender } from "../../utils/chatSender.js";
import PopUp from "../PopUp.js";
import { useState } from "react";


const AllUserChats = ({user, handleFunction, chat, loggedUser}) =>{
    const [popUpContent, setPopUpContent] = useState('');
    const [popUpPosition, setPopUpPosition] = useState('');
    const [popUpColor, setPopUpColor] = useState('');
    const [showPopUp, setShowPopUp] = useState(false);

    const showPopUpMessage = (content, color, position) => {
        setPopUpContent(content);
        setPopUpColor(color);
        setPopUpPosition(position);
        setShowPopUp(true);
        setTimeout(() => setShowPopUp(false), 4000); // Hide after 3 seconds
    };
  return (
    <div className="usercards" id="userCards">
        {showPopUp && <PopUp content={popUpContent} color={'black'} backgroundColor={popUpColor} position={popUpPosition}/>}
        <Card
                onClick={handleFunction}
                cursor={"pointer"}
                backgroundColor={"lightGray"}
                marginBottom={'20px'}
            >
            <Columns  position={'relative'} display={'flex'}>
                {/* Image */}
                <Column>
                {/* <img className="add-cursor avatar-size"
                src={user.pic} 
                alt="Account-image" 
                style={{
                    position: 'absolute', // Change to relative or remove
                    right: '190px',
                    // top: -8px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    border: '2px solid black'
                }}
                /> */}
                </Column>

                <Column>
                  <div>
                    {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName }
                  </div>

                  {chat.latestMessage && ( 
                    <p>
                         <b>{chat.latestMessage.sender.name} : </b>
                         {chat.latestMessage.content.length > 50
                            ? chat.latestMessage.content.substring(0, 51) + "..."
                            : chat.latestMessage.content}
                    </p>
                  )}
                </Column>
                </Columns>
        </Card>
    </div>
  );
};

export default AllUserChats;