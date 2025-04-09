import React, { useState } from "react";
import '../styles/ProfileModal.css';
import '../styles/selectedUser.css';
import { ChatState } from "../Context/ChatProvider";
import Card from "./chatPageComponents/Card";
import Avatar from "./chatPageComponents/Avatar";
import PopUp from "./PopUp";
import Input from "./Input";
import axios from "axios";
import UserItems from "./UserContext/UserItems";
import UserBadge from "./UserContext/UserBadge";

const GroupChatModal = ({ onClose }) => {
    const [popUpContent, setPopUpContent] = useState('');
    const [popUpPosition, setPopUpPosition] = useState('');
    const [popUpColor, setPopUpColor] = useState('');
    const [showPopUp, setShowPopUp] = useState(false);
    const [groupChatName, setGroupChatName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [hiddenUsers, setHiddenUsers] = useState([]);

    const { user, chats, setChats } = ChatState();

    const showPopUpMessage = (content, color, position) => {
        setPopUpContent(content);
        setPopUpColor(color);
        setPopUpPosition(position);
        setShowPopUp(true);
        setTimeout(() => setShowPopUp(false), 4000);
    };

    const handleSubmit = () => {

    }

    const handleDelete = (user) => {

    }

    // function to remove usersCard
    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            setSearchResult([]);
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`http://localhost:5000/api/user?search=${query}`, config);
            console.log(data);
            setSearchResult(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
            showPopUpMessage('Failed to obtain search results!', 'red');
        }
    };

    const handleGroup = (userId) => {
        if (selectedUsers.includes(userId)) {
            // User is already selected, so we need to hide them
            setSelectedUsers(prevSelected => prevSelected.filter(user => user !== userId));
            setHiddenUsers(prevHidden => [...prevHidden, userId]); // Add to hidden users
            showPopUpMessage('User  removed from selection!', 'yellow');
        } else {
            // User is not selected, so we need to show them
            setSelectedUsers(prevSelected => [...prevSelected, userId]);
            setHiddenUsers(prevHidden => prevHidden.filter(user => user !== userId)); // Remove from hidden users
        }
    };

    const createGroupChat = async () => {
        if (!groupChatName || selectedUsers.length === 0) {
            showPopUpMessage('Please provide a group name and select users!', 'red');
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post('http://localhost:5000/api/chat/group', {
                name: groupChatName,
                users: JSON.stringify(selectedUsers),
            }, config);

            setChats([data, ...chats]);
            showPopUpMessage('Group chat created successfully!', 'green');
            onClose();
        } catch (error) {
            console.error("Error creating group chat:", error);
            showPopUpMessage('Failed to create group chat!', 'red');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h1 style={{ color: 'black' }}><b>Create Group Chat</b></h1>

                <div className="group-inputs" style={{ textAlign: 'center' }}>
                    <Input
                        input={{
                            type: 'text',
                            placeholder: 'Group Name',
                            name: 'groupChatName',
                            value: groupChatName,
                            onChange: (e) => setGroupChatName(e.target.value),
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
                            placeholder: 'Add users (e.g John Doe . . .)',
                            name: 'text',
                            onChange: (e) => handleSearch(e.target.value),
                            backgroundColor: 'white',
                            border: '2px solid lightgray',
                            marginTop: '0px',
                            marginBottom: '20px',
                            color: 'black'
                        }}
                    />
                    
                    {selectedUsers.map(u => (
                        <UserBadge key={u._id} user={u} handleFunction={handleDelete(u)}/>
                    ))}
                    
                    <>
                        {searchResult && searchResult.length > 0 ? (
                            searchResult
                            .filter(user => !hiddenUsers.includes(user._id)) // Filter out hidden users
                            .slice(0, 4)
                            .map(user => (
                                <div onClick={() => handleGroup(user._id)} key={user._id} className="chat-card selected-card-style" id="selectedCard">
                                    <div className="chat-header">
                                        <img src={user.pic} alt="User  Avatar" className="avatar" />
                                        <div className="user-info">
                                            <h3 className="username"><b>{user.flname}</b></h3>
                                            <p className="timestamp">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : null}
                    </>
                </div>
                <button className="button button-gap" onClick={onClose}>Close</button>
                <button className="button" style={{ backgroundColor: "#7ed957" }} onClick={createGroupChat}>Create Group</button>
            </div>
        </div>
    );
};

export default GroupChatModal;