import React, { useState, useEffect, useRef } from "react";
import Card from "../components/chatPageComponents/Card";
import echoLogo_black from '../assets/echo_text_logo_black.png'; 
import echoLogo_white from '../assets/echo_text_logo_white.png'; 
import echoLogo_gray from '../assets/echo_text_logo_gray.png';
import EchoTextLogo from "../components/EchoTextLogo";
import '../styles/ChatAppPage.css';
import SearchBar from "../components/chatPageComponents/SearchBar";
import StatusCard from "../components/StatusCard";
import Avatar from "../components/chatPageComponents/Avatar";
import { io } from 'socket.io-client';

// Importing Modals
import NewCallModal from "../components/modals/NewCallModal";
import SettingsModal from "../components/modals/SettingsModal";

import { ChatState } from "../Context/ChatProvider";
import axios from 'axios'
import ScrollableChats from "../components/UserContext/ScrollableChats.js";
import Spinner from "../components/Spinner.js";

import '../styles/MessageSection.css';

import PopUp from "../components/PopUp";
import UserItems from "../components/UserContext/UserItems";
import '../styles/selectedUser.css';

function ChatAppPage(){
    const API_URL = process.env.REACT_APP_API_URL;

    const socket = useRef(null);
    // FOR POP UP CARD
    const showPopUpMessage = (content, color, position) => {
        setPopUpContent(content);
        setPopUpColor(color);
        setPopUpPosition(position);
        setShowPopUp(true);
        setTimeout(() => setShowPopUp(false), 4000); // Hide after 3 seconds
    };

    const [popUpContent, setPopUpContent] = useState('');
    const [popUpPosition, setPopUpPosition] = useState('');
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpColor, setPopUpColor] = useState('');

    const [selectedUser, setSelectedUser] = useState(null); // State to track selected user
    const [singleSelectedUser, setSingleSelectedUser] = useState(null); // State to track selected user
    const [searchedSelectedUsers, setSearchedSelectedUsers] = useState([]); // State to track selected user

    const [loggedUser, setLoggedUser] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState();


    const playSound = () => {
        const audio = new Audio(require('../assets/chatNotification_sound.mp3')); // Adjust the path as necessary
        audio.play();
    };

    // Initialize socket connection when the component mounts
    useEffect(() => {
        if (!socket.current) {
        // Initialize socket connection once when component mounts
        socket.current = io(API_URL); // Change URL to your server's URL if needed
        }
    
        return () => {
        if (socket.current) {
            socket.current.disconnect();  // Clean up and disconnect the socket when component unmounts
        }
        };
    }, []);

    

    // chatstate
    const { user, chats, setChats, selectedChat,setSelectedChat } = ChatState();

    // state created for search purposes
    const [search, setSearch] = useState(''); // State to track search input

    // State for setting the search result
    const [searchResult, setSearchResult] = useState([]);

    // state to determing if search bar is active
    const [searchActive, setSearchActive] = useState(false); // State to track search input

    // Function to handle the search of created users
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
    
                const { data } = await axios.get(`${API_URL}/api/user?search=${query}`, config);
                console.log(data);
                setSearchActive(true); // Set search active to true when searching
                setSearchResult(data);
            } catch (error) {
                console.error("Error fetching search results:", error);
                showPopUpMessage('Failed to obtain search results!', 'red');
            }
        };

    // Fetch messages whenever the selected chat changes
   
    // function to fetch messages
    const fetchMessages = async () => {
        if (!selectedChat) {
            console.log("No selected chat.");
            return;
        }
    
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
    
            console.log("Fetching messages for chat ID:", selectedChat._id);
            console.log("Using token:", user.token);
    
            setLoading(true);
    
            // Axios call to fetch messages
            const { data } = await axios.get(`${API_URL}/api/Message/${selectedChat._id}`, config);
    
            console.log("Fetched messages:", data); // Log the fetched messages
            if (data && Array.isArray(data)) {
                setMessages(data);
            } else {
                console.error("Unexpected data format:", data);
                showPopUpMessage("Unexpected message data format", "yellow");
            }
    
            // Emit the socket event only if the connection is ready
            if (socket && socket.connected) {
                socket.emit("join chat", selectedChat._id);
            } else {
                console.error("Socket is not connected");
            }
    
        } catch (error) {
            console.error("Error fetching messages:", error.response ? error.response.data : error.message);
            showPopUpMessage("Failed to load messages", "yellow");
            setLoading(false); // Ensure loading state is reset on error
        } finally {
            setLoading(false); // Ensure loading state is reset on completion (success or failure)
        }
    };
    
    // Function to handle message sending
    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            event.preventDefault();
            if (!selectedChat) {
                console.error("No chat selected");
                showPopUpMessage("No chat selected!", "red");
                return; // Exit the function if no chat is selected
            }
    
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
    
                const { data } = await axios.post(`${API_URL}/api/Message`, {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config);
    
                console.log(data);
                setMessages([...messages, data]);
                
                // Clear the input field after sending the message
                setNewMessage(""); // Assuming setNewMessage is the function to update newMessage state
    
            } catch (error) {
                console.error("Error sending message:", error);
                showPopUpMessage("Failed to send message", "yellow");
            }
        }
    }

    // function for typing handler
    const typingHandler = (e) => {
        if (e && e.target) {
            setNewMessage(e.target.value);
        } else {
            console.error("Event is undefined or does not have a target");
        }
    }

    // function to handle datetime format
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        
        // Calculate the difference in milliseconds
        const diffInMs = now - date;
        const diffInHours = diffInMs / (1000 * 60 * 60);
        const diffInDays = diffInHours / 24;
    
        if (diffInHours < 24) {
            // If less than 24 hours, display the time
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (diffInDays > 24) {
            // If it's yesterday
            return "YESTERDAY";
        } else {
            // If older than yesterday, display the date in "dd-mm-yy" format
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
            return `${day}-${month}-${year}`;
        }
    };

    // function to access the chat of serached user:
    const accessChat = async (userId) => {
        if (!user || !user.token) {
            showPopUpMessage('User  is not authenticated!', 'red');
            return;
        }
    
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
    
            const { data } = await axios.post(`${API_URL}/api/chat`, { userId }, config);
    
            // Check if the chat already exists in the state
            if (!chats.find((c) => c._id === data._id)) {
                setChats((prevChats) => [data, ...prevChats]); // Update chats state
            }

            return data; // Return the chat data
        } catch (error) {
            console.error("Error accessing chat:", error.response ? error.response.data : error.message);
            showPopUpMessage('Failed to access selected user(s) chat!', 'red');
            return null; // Return null if there's an error
        }
    };
    
    // Function to post Image
    const postImage = async (pics) => {
        if (!pics) {
            showPopUpMessage('Please select an Image!', 'yellow');
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "echo-chat-app");
            data.append("cloud_name", "dnxd86qnx");

            try {
                const res = await fetch("https://api.cloudinary.com/v1_1/dnxd86qnx/image/upload", {
                    method: "POST",
                    body: data,
                });

                const responseData = await res.json();
                const imageUrl = responseData.url.toString();
                console.log(imageUrl);

                // Set the new message content to the image URL
                setNewMessage(imageUrl); // Set the image URL as the message content

                // Now send the message with the uploaded image URL
                await sendMessage(imageUrl);

                showPopUpMessage('Image uploaded and message sent!', 'green');
            } catch (err) {
                console.log(err);
                showPopUpMessage('Error uploading image!', 'red');
            }
        } else {
            showPopUpMessage('Please Select an Image!', 'yellow');
        }
    };

    // function to handle user select when serached
    const handleUserSelect = async (user) => {
        if (user && user._id) {
            // Check if the user is already selected
            if (!searchedSelectedUsers.find(u => u._id === user._id)) {
                // Use the functional form to update state and local storage
                setSearchedSelectedUsers(prevUsers => {
                    const updatedUsers = [...prevUsers, user]; // Create the updated array
                    localStorage.setItem('selectedUsers', JSON.stringify(updatedUsers)); // Save to localStorage
                    return updatedUsers; // Return the updated state
                });
    
            } else {
                showPopUpMessage('User  already selected!', 'yellow');
            }
        } else {
            showPopUpMessage('Invalid user selected!', 'red');
        }
    };


    // function to handle user select when serached
    const handleSingleSelectedUser  = async (selecteduser) => {
        if (selecteduser && selecteduser._id) {
            console.log("Selected user:", selecteduser); // Log the selected user
    
            // Set the selected user directly, overwriting any previous selection
            setSingleSelectedUser(selecteduser); // Store the selected user
    
            // Save to localStorage
            localStorage.setItem('singleSelectedUser', JSON.stringify(selecteduser));
    
            // Await the result of accessChat
            const chat = await accessChat(selecteduser._id);
            console.log("Chat returned from accessChat:", chat); // Log the chat returned
    
            // Check if chat is valid before setting it
            if (chat) {
                setSelectedChat(chat); // Set the selected chat here
                setLoading(true);

                //  // Fetch messages for the selected chat
                 await fetchMessages();
                console.log("Selected chat:", chat);
            } else {
                console.error("Failed to access selected user's chat");
                showPopUpMessage("Failed to access selected user's chat!", "red");
            }
        } else {
            showPopUpMessage('Invalid user selected!', 'red');
        }
    };

    const [activeSection, setActiveSection] = useState("chats"); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isFileModalOpen, SetIsFileModalOpen] = useState(false)

    // Handler functions to switch sections
    const showChats = () => {
        setActiveSection("chats");
        const chatsCol1 = document.getElementById('chatsCol1');
        if (chatsCol1) {
            chatsCol1.style.display = "block";
        } else {
            console.error("Element with ID 'chatsCol1' not found.");
        }
    };

    // Function to show the selected users chats with user
    const showSelectedUserChats = () => {
        setActiveSection("chats");
        const chatsCol2 = document.getElementById('chatsCol2');
        const chatsCol3 = document.getElementById('chatsCol3');
        if (chatsCol2) {
            chatsCol2.style.display = "none";
            chatsCol3.style.display = "block";
        } else {
            console.error("Element with ID 'chatsCol3' not found.");
        }
    };
    const showCalls = () => {
        setActiveSection("calls");
        const callCol1 = document.getElementById('callCol1');
        if (callCol1) {
            callCol1.style.display = "block";
        } else {
            console.error("Element with ID 'callCol1' not found.");
        }
    };
    const showStatus = () => {
        setActiveSection("status");
        const statusCol1 = document.getElementById('statusCol1');
        if (statusCol1) {
            statusCol1.style.display = "block";
        } else {
            console.error("Element with ID 'statusCol1' not found.");
        }
    };

    useEffect(() => {
        const callCol1 = document.getElementById('callCol1');
        const callCol2 = document.getElementById('callCol2');
        if (callCol1) {
            if (activeSection === "calls") {
                callCol1.classList.add('show'); // Add class to show
                callCol2.classList.add('show'); // Add class to show
            } else {
                callCol1.classList.remove('show'); // Remove class to hide
                callCol2.classList.remove('show'); // Remove class to hide
            }
        }
    }, [activeSection]);

    useEffect(() => {
        const chatsCol1 = document.getElementById('chatsCol1');
        const chatsCol2 = document.getElementById('chatsCol2');
        if (chatsCol1) {
            if (activeSection === "chats") {
                chatsCol1.classList.add('show'); // Add class to show
                chatsCol2.classList.add('show'); // Add class to show
            } else {
                chatsCol1.classList.remove('show'); // Remove class to hide
                chatsCol2.classList.remove('show'); // Remove class to hide
            }
        }
    }, [activeSection]);

    useEffect(() => {
        const statusCol1 = document.getElementById('statusCol1');
        const statusCol2 = document.getElementById('statusCol2');
        if (statusCol1) {
            if (activeSection === "status") {
                statusCol1.classList.add('show'); // Add class to show
                statusCol2.classList.add('show'); // Add class to show
            } else {
                statusCol1.classList.remove('show'); // Remove class to hide
                statusCol2.classList.remove('show'); // Remove class to hide
            }
        }
    }, [activeSection]);


    
     // Fetch messages whenever the selected chat changes
     useEffect(() => {
        fetchMessages();
    }, [selectedChat]);

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    // Function modal button click
    const toggleNewCall = () => {
        setIsModalOpen(true); // Open the modal
    };

    // functions to close and open file modal
    const closeFileModal = () => {
        SetIsFileModalOpen(false); // Close the modal
    };

    // Toggling file modal
    const toggleFileModal = () => {
        SetIsFileModalOpen(true); // Close the modal
    };

    // Function to close the modal
    const closeSettingsModal = () => {
        setIsSettingsModalOpen(false); // Close the modal
    };

    // Function modal button click
    const toggleSettingsModal = () => {
        setIsSettingsModalOpen(true); // Open the modal
    };

    // Fetch messages when selectedChat changes
    useEffect(() => {
        if (selectedChat) {
        // Emit to the server to listen to this specific chat
        socket.current.emit("joinChat", selectedChat._id); // Join a specific chat room (chatId)
        }
    }, [selectedChat]); // Dependency on selectedChat to change whenever the chat is selected
    
    // Listen for messages related to the selected chat
    useEffect(() => {
        if (socket.current) {
        socket.current.on('receiveMessage', (message) => {
            console.log('Received message:', message);
            setMessages((prevMessages) => [...prevMessages, message]);  // Update state with new message
            playSound(); // Play sound when a new message is received
        });
        }
    
        return () => {
        if (socket.current) {
            socket.current.off('receiveMessage'); // Cleanup when component unmounts
        }
        };
    }, [selectedChat]); // Re-run whenever the selectedChat changes

    return(
        <div>
        {/* Header section */}
        <header>
            <Card borderRadius={"0px"} backgroundColor={"#202020"}>
                <div className="logo-size">
                    <EchoTextLogo echoLogo={echoLogo_black} />
                </div>
            </Card>
        </header>
        

        {/* Chat page columns */}
        {showPopUp && <PopUp content={popUpContent} color={'black'} backgroundColor={popUpColor} position={popUpPosition}/>}
        <div className="columns is-gapless column-size">
            <div className="column is-one-fifth" id="sideNavBar">
                <Card borderRadius={"0px"} backgroundColor={"#202020"} height={"100vh"}>
                    <div className="columns columns-control">
                        <div className="column">
                            <div className="outer-card" id="chatSectionIcon" onClick={showChats}>
                                <i className="fa-solid fa-comment"></i>
                            </div>
                            <div className="outer-card" id="CallLogSectionIcon" onClick={showCalls}>
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            <div className="outer-card" id="StatusSectionIcon" onClick={showStatus}>
                                <i className="fa-solid fa-panorama"></i>
                            </div>

                            <div className="profileSectionNav">
                                <div className="font-icon">
                                    <i className="fa-solid fa-gear" onClick={toggleSettingsModal}></i>
                                </div>

                                    <div id="avatar">
                                        <Avatar />
                                    </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>



            {/* Main content area */}
            <div className="column" id="mainContent">
                <Card borderRadius={"0px"} backgroundColor={"#202020"} height={"100vh"}>
                    <div className="columns" style={{ backgroundColor: "#2c2c2c", height: "100vh", borderRadius: "1%" }}>
                        {activeSection === "chats" && (
                            <>
                                <div className="column is-one-fifth left-col border-right" id="chatsCol1">
                                    <span className="heading">
                                        <p>Chats</p>
                                        <SearchBar
                                            backgroundColor={"#202020"}
                                            border={"1px solid #343434"}
                                            margin={"20px 0 0 0"}
                                            placeholder={'Search or start new chat'}

                                            // for detect change in search
                                            onChange={(e) => handleSearch(e.target.value)}
                                        />
                                        <div>
                                            {/* Search results here */}
                                            {searchActive ? (
                                                <div className="card-style">
                                                    <Card color={'white'} position={'absolute'} backgroundColor={'#2c2c2c'} boxShadow={"none"} >
                                                        <div>
                                                            
                                                            {searchResult.length > 0 ? (
                                                                searchResult.map(user => (
                                                                    <UserItems 
                                                                        key={user._id}
                                                                        user={user}
                                                                        handleFunction={() => handleUserSelect(user)}
                                                                    />
                                                                ))
                                                            ) : (
                                                                null
                                                            )}
                    
                                                            <div>
                                                            {searchedSelectedUsers.map(user => (
                                                                <div key={user._id} className="chat-card selected-card-style"
                                                                onClick={() => {
                                                                    handleSingleSelectedUser(user);
                                                                    showSelectedUserChats();
                                                                    
                                                                }}>
                                                                    <div className="chat-header">
                                                                        <img src={user?.pic} alt="User  Avatar" className="avatar" />
                                                                        <div className="user-info">
                                                                            <h3 className="username"><b>{user.flname}</b></h3>
                                                                            <p className="timestamp">{`Last Reply: ${formatTime(user.createdAt)}`}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </div>
                                            ) : null}
                                        </div>
                                    </span>
                                </div>
                                <div className="column justify-col-content" id="chatsCol2">
                                    <EchoTextLogo echoLogo={echoLogo_gray} />
                                    <p className="item-m-bottom-90">
                                        Stay in touch with friends, family, or colleagues with ease — anytime.
                                    </p>
                                    <p className="item-m-bottom-70">
                                        Getting started is simple: <b>search</b> for a contact, <b>select</b> their profile, and start the conversation.
                                    </p>
                                </div>
                                <div className="column" id="chatsCol3">
                                    <div className="columns is-gapless chat-section">
                                        <div className="column border-bottom">
                                                <div className="card" style={{borderRadius: '10px 10px 0px 0px', backgroundColor: '#202020'}}>
                                                    <div className="card-content" style={{padding: '0px'}}>
                                                    <div className="columns" style={{gap: '77%'}}>
                                                        <div className="columns" style={{position: 'relative', left: '20px', top: '9px'}}>
                                                            <div className="column">
                                                                <div className='chats-image-container'>
                                                                {singleSelectedUser  && (
                                                                    <img className='chats-image'
                                                                        src={singleSelectedUser.pic || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'} 
                                                                        alt="Avatar" 
                                                                    />
                                                                )}
                                                                </div>
                                                            </div>

                                                            {singleSelectedUser  && ( // Check if singleSelectedUser  is not null
                                                                <div className="column">
                                                                    <p id="fulname">{singleSelectedUser.flname || "Username"}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="column" id="contactBtns">
                                                            <button className="button" id="videoCallBtn" onClick={showCalls}><i class="fa-solid fa-video"></i></button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                        </div>
                                        <div className="column border-bottom border-left border-right
                                        border-top">
                                            <div className="card message-section" style={{borderRadius: '0px', backgroundColor: '#2c2c2c'}}>
                                                {/* Message will be displayeed here */}
                                                <div>
                                                     {loading ? <Spinner /> : <ScrollableChats messages={messages} />}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="column last-col-radius">
                                            <div className="card" style={{borderRadius: '0px 0px 10px 10px', backgroundColor: '#202020'}}>
                                                    <div className="card-content" style={{padding: '0px'}}>
                                                    <div className="columns cols-gap">
                                                        <div className="columns is-gapless" style={{position: 'relative', left: '20px', top: '9px'}}>
                                                            <div className="column is-half">
                                                                <i 
                                                                    className="fa-solid fa-paperclip" 
                                                                    id="clip-icon" 
                                                                    onClick={() => document.getElementById('file-input').click()} // Trigger file input click
                                                                    style={{ cursor: 'pointer' }} // Change cursor to pointer for better UX
                                                                ></i>
                                                                <input 
                                                                    id="file-input" 
                                                                    type="file" 
                                                                    accept="image/*" 
                                                                    className="file-input" 
                                                                    onChange={(e) => postImage(e.target.files[0])}
                                                                    style={{ display: 'none' }} // Hide the input
                                                                />
                                                            </div>
                                                            <div className="column" id="replyInput-col">
                                                                <input type="text" id="replyInput" style={{ backgroundColor: '#202020' }}
                                                                placeholder="Type a response" 
                                                                value={newMessage} onKeyDown={sendMessage} onChange={typingHandler}/>
                                                            </div>
                                                        </div>
                                                        <div className="column" id="mic-icon">
                                                            <i class="fa-solid fa-microphone" id="mic-icon"></i>
                                                        </div>
                                                    </div>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}


                        {activeSection === "calls" && (
                            <>
                                <div className="column is-one-fifth left-col border-right" id="callCol1">
                                    <div className="columns" id="callCols">
                                        <div className="column">
                                            <span className="heading">
                                                <p>Calls</p>
                                            </span>
                                        </div>
                                        <div className="column">
                                            <div className="col-item" onClick={toggleNewCall}>
                                                <i className="fa-solid fa-phone"></i>
                                                <i className="fa-solid fa-plus"></i>
                                            </div>

                                        </div>
                                    </div>
                                    <p>Recent</p>
                                    <div>{/* Recent calls display here */}</div>
                                </div>

                                {/* Render the NewCall if isModalOpen is true */}
                                {isModalOpen && <NewCallModal onClose={closeModal} />}

                                <div className="column justify-col-content" id="callCol2">
                                    <div className="card card-height startcall" onClick={toggleNewCall}>
                                        <i className="fa-solid fa-video videoIcon"></i>
                                    </div>
                                    <p className="item-m-bottom-90">Start Call</p>
                                </div>
                            </>
                        )}

                        {activeSection === "status" && (
                            <>
                                <div className="column is-one-fifth left-col border-right" id="statusCol1">
                                    <span className="heading header-left-8">
                                        <p>Status</p>
                                    </span>
                                    <StatusCard username={user.flname} pic={user?.pic} />
                                    <p className="item-m-top-8">Active Contacts Status</p>
                                </div>
                                <div className="column justify-col-content" id="statusCol2">
                                    Click on a contact to view their status
                                </div>
                            </>
                        )}
                        {isSettingsModalOpen && <SettingsModal onClose={closeSettingsModal} />}
                    </div> 
                </Card>
            </div>
        </div>
    </div>
    );
}

export default ChatAppPage;