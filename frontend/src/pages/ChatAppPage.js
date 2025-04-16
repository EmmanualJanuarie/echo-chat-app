import React, { useState, useEffect } from "react";
import Card from "../components/chatPageComponents/Card";
import echoLogo_black from '../assets/echo_text_logo_black.png'; 
import echoLogo_white from '../assets/echo_text_logo_white.png'; 
import echoLogo_gray from '../assets/echo_text_logo_gray.png';
import EchoTextLogo from "../components/EchoTextLogo";
import '../styles/ChatAppPage.css';
import SearchBar from "../components/chatPageComponents/SearchBar";
import StatusCard from "../components/StatusCard";
import Avatar from "../components/chatPageComponents/Avatar";
import NewCallModal from "../components/modals/NewCallModal";
import SettingsModal from "../components/modals/SettingsModal";
import { ChatState } from "../Context/ChatProvider";
import Clip from "../components/chatPageComponents/Clip";

function ChatAppPage(){

    const { user } = ChatState();

    const [activeSection, setActiveSection] = useState("chats"); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

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

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    // Function modal button click
    const toggleNewCall = () => {
        setIsModalOpen(true); // Open the modal
    };

    // Function to close the modal
    const closeSettingsModal = () => {
        setIsSettingsModalOpen(false); // Close the modal
    };

    // Function modal button click
    const toggleSettingsModal = () => {
        setIsSettingsModalOpen(true); // Open the modal
    };

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
            <div className="column">
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
                                        />
                                        <div>{/* Add searched chats here */}</div>
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
                                                                    <img className='chats-image'
                                                                        src={user?.pic || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'} 
                                                                        alt="Avatar" 
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="column">
                                                                <p>Username</p>
                                                                <p>Last seen</p>
                                                            </div>
                                                        </div>
                                                        <div className="column" id="contactBtns">
                                                            <button className="button"><i class="fa-solid fa-video"></i></button>
                                                            <button className="button"><i class="fa-solid fa-phone"></i></button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                        </div>
                                        <div className="column border-bottom border-left border-right
                                        border-top">
                                            <div className="card message-section" style={{borderRadius: '0px', backgroundColor: '#2c2c2c'}}>
                                                {/* Message will be displayeed here */}
                                            </div>
                                        </div>
                                        <div className="column last-col-radius">
                                            <div className="card" style={{borderRadius: '0px 0px 10px 10px', backgroundColor: '#202020'}}>
                                                    <div className="card-content" style={{padding: '0px'}}>
                                                    <div className="columns cols-gap">
                                                        <div className="columns is-gapless" style={{position: 'relative', left: '20px', top: '9px'}}>
                                                            <div className="column is-half">
                                                            <i class="fa-solid fa-paperclip" id="clip-icon"></i>
                                                            </div>
                                                            <div className="column " id="replyInput-col">
                                                                <input type="text" id="replyInput" style={{ backgroundColor: '#202020' }}
                                                                placeholder="Type a response"/>
                                                            </div>
                                                        </div>
                                                        <div className="column" id="contactBtns">
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
                                    <div className="card card-height startcall">
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