import React, { useState } from "react";
import '../styles/ProfileModal.css';
import { ChatState } from "../Context/ChatProvider";
import Card from "./chatPageComponents/Card";
import Avatar from "./chatPageComponents/Avatar";
import PopUp from "./PopUp";
import Input from "./Input";

const GroupChatModal = ({ onClose }) =>{
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

    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const { user, chats, setChats } = ChatState();
    return(
        <div className="modal-overlay">
        <div className="modal-content">
            <h1 style={{color: 'black'}}><b>Create Group Chat</b></h1>

           <div className="group-inputs" style={{textAlign: 'center'}}>
            <Input
            input={{
                type: 'text',
                placeholder: 'Group Name',
                name: 'text',
                backgroundColor: 'white',
                border: '2px solid lightgray',
                marginTop: '10px',
                marginBottom: '20px',
                color: 'black'
            }}
        />

            <Input
                input={{
                    type: 'text',
                    placeholder: 'Add users (e.g John Doe, Alex...)',
                    name: 'text',
                    backgroundColor: 'white',
                    border: '2px solid lightgray',
                    marginTop: '0px',
                    marginBottom: '20px',
                    color: 'black'
                }}
            />
           </div>
            <button className="button button-gap" onClick={onClose}>Close</button>
            <button className="button" style={{backgroundColor: "#7ed957"}} >Create Group</button>

            
        </div>
    </div>
    );
};

export default GroupChatModal;