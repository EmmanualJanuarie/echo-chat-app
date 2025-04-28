import '../../styles/SettingsModal.css';
import React, { useRef, useEffect, useState} from 'react';
import SearchBar from '../chatPageComponents/SearchBar';
import Card from '../chatPageComponents/Card';
import { ChatState } from '../../Context/ChatProvider';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SettingsModal = ({onClose}) =>{

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

    const navigate = useNavigate();
    const { user } = ChatState();
    const [fullName, setFullName] = useState(user?.flname);
    const [bio, setBio] = useState(user?.bio);
    const [activeSection, setActiveSection] = useState("profile"); 
    const [profileInputs, setProfileInputs] = useState("fullname"); 
    const [bioInput, setBioInput] = useState("bio"); 

    //function to logout user
    const logoutHandler = () =>{
        localStorage.removeItem("userInfo");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("updatedUserInfo");
        localStorage.removeItem("selectedUser");
        navigate('/');
    }

    // Function to delete user
    const deleteUser = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                const local_email = localStorage.getItem("userEmail");
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`, // Include token if required
                    },
                };
    
                await axios.delete(`http://localhost:5000/api/user/${local_email}/delete-user`, config);
                showPopUpMessage('User account deleted successfully!', 'green');
                navigate("/signup"); // Redirect to signup or login page after deletion
            } catch (error) {
                console.error("Error deleting user:", error);
                showPopUpMessage('Failed to delete user!', 'red');
            }
        }
    };

    // Handle input change
    const handleInputChange = (event) => {
        setFullName(event.target.value); // Update state with the new input value
    };

    const handleBioInputChange = (event) => {
        setBio(event.target.value); // Update state with the new input value
    };

    const  showProfile = () => {
        setActiveSection("profile");
        const ProfileSection = document.getElementById('ProfileSection');
        if (ProfileSection) {
            ProfileSection.style.display = "block";
        } else {
            console.error("Element with ID 'ProfileSection' not found.");
        }
    };

    const  showFullNameInput = () => {
        setProfileInputs("fullname");
        const flnameInput = document.getElementById('flnameInput');
        const flnameId = document.getElementById('flnameId');
        if (flnameInput) {
            flnameInput.style.display = "block";
            flnameId.style.display = "none";
        } else {
            console.error("Element with ID 'flnameInput' not found.");
        }
    };


    const  showBioInput = () => {
        setBioInput("bio");
        const bioInput = document.getElementById('bioInput');
        const bioId = document.getElementById('bioId');
        if (bioInput) {
            bioInput.style.display = "block";
            bioId.style.display = "none";
        } else {
            console.error("Element with ID 'flnameInput' not found.");
        }
    };

    const  showBioInfo = () => {
        setBioInput("bio");
        const bioInput = document.getElementById('bioInput');
        const bioId = document.getElementById('bioId');
        if (bioInput) {
            bioInput.style.display = "none";
            bioId.style.display = "flex";
        } else {
            console.error("Element with ID 'flnameInput' not found.");
        }
    };

    const  showFullname = () => {
        setProfileInputs("fullname");
        const flnameInput = document.getElementById('flnameInput');
        const flnameId = document.getElementById('flnameId');
        if (flnameInput) {
            flnameInput.style.display = "none";
            flnameId.style.display = "flex";
        } else {
            console.error("Element with ID 'flnameInput' not found.");
        }
    };

    

    const  showAccount = () => {
        setActiveSection("account");
        const AccountSection = document.getElementById('AccountSection');
        if (AccountSection) {
            AccountSection.style.display = "block";
        } else {
            console.error("Element with ID 'AccountSection' not found.");
        }
    }

    const  showHelp = () => {
        setActiveSection("help");
        const HelpSection = document.getElementById('HelpSection');
        if (HelpSection) {
            HelpSection.style.display = "block";
        } else {
            console.error("Element with ID 'HelpSection' not found.");
        }
    }

        useEffect(() => {
            const ProfileSection = document.getElementById('ProfileSection');
            if (ProfileSection) {
                if (activeSection === "calls") {
                    ProfileSection.classList.add('show'); // Add class to show
                } else {
                    ProfileSection.classList.remove('show'); // Remove class to hide
                }
            }
        }, [activeSection]);

        useEffect(() => {
            const flnameInput = document.getElementById('flnameInput');
            const flnameId = document.getElementById('flnameId');
            if (flnameInput) {
                if (activeSection === "fullname") {
                    flnameInput.classList.add('show'); // Add class to show
                    flnameId.classList.remove('show'); // Remove class to hide
                } else {
                    flnameInput.classList.remove('show'); // Remove class to hide
                }
            }

        }, [activeSection]);

        useEffect(() => {
            const HelpSection = document.getElementById('HelpSection');
            if (HelpSection) {
                if (activeSection === "calls") {
                    HelpSection.classList.add('show'); // Add class to show
                } else {
                    HelpSection.classList.remove('show'); // Remove class to hide
                }
            }
        }, [activeSection]);

        useEffect(() => {
            const AccountSection = document.getElementById('AccountSection');
            if (AccountSection) {
                if (activeSection === "calls") {
                    AccountSection.classList.add('show'); // Add class to show
                } else {
                    AccountSection.classList.remove('show'); // Remove class to hide
                }
            }
        }, [activeSection]);

    return(
        <div>
            <div className='columns modal-size modal-card-pos' id='settings'>
                <div className='column border-right is-two-fifths col1-radius' style={{backgroundColor: "#292929"}}>
                    <div className='columns' style={{textAlign: 'center'}}>
                        <div className='column'>
                            <div className='settings-card bottom-20' onClick={showProfile}>
                                <div className='columns'>
                                    <div className='column'><i class="fa-solid fa-user"></i></div>
                                    <div className='column'>Profile</div>
                                </div>
                            </div>

                            <div className='settings-card bottom-20' onClick={showAccount}>
                                <div className='columns'>
                                    <div className='column'><i class="fa-solid fa-key"></i></div>
                                    <div className='column'>Account</div>
                                </div>
                            </div>

                            <div className='settings-card bottom-20 help-section' onClick={showHelp}>
                                <div className='columns'>
                                    <div className='column'><i class="fa-solid fa-circle-info"></i></div>
                                    <div className='column'>Help</div>
                                </div>
                            </div>

                            <span style={{textAlign: 'center'}} className='bottomm-button' onClick={onClose}>close</span>
                        </div>
                    </div>

                </div>
                {activeSection === "profile" && (
                    <div className='column is-full col2-radius' id='ProfileSection' style={{backgroundColor: "#2c2c2c"}}>
                        <div className='card-content'>
                            <img className='userpicture'
                                src={user?.pic || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'} 
                                alt="Avatar" 
                            />

                            <div className='columns top-2 cols-gap-xs cols-justify-content' id='flnameId'>
                                <div className='column font-size-l'>
                                    <p style={{color: 'white', fontWeight: '600'}}>{user?.flname}</p>
                                </div>
                                <div className='column font-size-l'><i class="fa-solid fa-pen" onClick={showFullNameInput}></i></div>
                            </div>

                            {profileInputs === "fullname" && (
                                <div id='flnameInput'>
                                    <div className="input-bar">
                                        <input type="text" value={fullName} style={{ backgroundColor: '#202020' }}
                                        onChange={handleInputChange} />
                                    </div>

                                    <div className='columns is-gapless'>
                                        <div className='column'>
                                            <button className='button btns-100' onClick={showFullname}>Cancel</button>
                                        </div> 
                                        <div className='column'>
                                        <button className='button btns-100'>Done</button>
                                        </div> 
                                    </div>
                                </div>
                            )}

                            
                            <p>Bio:</p>
                            <div className='columns top-2 cols-gap-xs cols-justify-content' id='bioId'>
                                
                                <div className='column font-size-m'>
                                    <p style={{color: 'white'}}>{user.bio}</p>
                                </div>
                                <div className='column font-size-l'><i class="fa-solid fa-pen" onClick={showBioInput}></i></div>
                            </div>

                            {bioInput === "bio" && (
                                <div id='bioInput'>
                                    <div className="input-bar">
                                        <input type="text" value={bio} style={{ backgroundColor: '#202020' }}
                                        onChange={handleBioInputChange} />
                                    </div>

                                    <div className='columns is-gapless'>
                                        <div className='column'>
                                            <button className='button btns-100' onClick={showBioInfo}>Cancel</button>
                                        </div> 
                                        <div className='column'>
                                        <button className='button btns-100'>Done</button>
                                        </div> 
                                    </div>
                                </div>
                            )}

                            <p className='contactNum'>Phone Number:</p> 
                            <p className='tel'>{user.tel}</p>

                            <hr/>
                            <button className='button is-danger' onClick={logoutHandler}>Logout</button>
                        </div>
                    </div>
                )}
                {activeSection === "account" && (
                    <div className='column is-full col2-radius' id='AccountSection' style={{backgroundColor: "#2c2c2c", textAlign: 'left'}}>
                        <h1 className='heading text-left-1' style={{textAlign: 'left'}}>Account</h1>
                        <span className="text-left-1" style={{position:'relative', top:'50px'}}>
                            <p>If you'd like to <b>delete your account</b>,</p>
                            <p>Please note that this action is permanent</p>
                            <p>and all <b>your data will be erased</b>.</p>

                            <p style={{marginTop: '20px', marginBottom: '20px'}}>Once deleted, your account cannot be recovered.</p>

                            
                            <button className='button is-danger' onClick={deleteUser}>Delete Account</button>
                        </span>
                    </div>
                )}
                {activeSection === "help" && (
                    <div className='column is-full col2-radius' id='HelpSection' style={{backgroundColor: "#2c2c2c"}}>
                        <h1 className='heading text-left-1' style={{textAlign: 'left'}}>
                            Help
                        </h1>

                        <h1 className='help-font text-left-1'>Contact us</h1>
                        <p className='text-left-1'>We'd like to know your feedback</p>
                        
                        <hr/>
                        <p className='text-left-1 contactus-text' id='contactusId'>Contact us</p>
                        <p className='text-left-1 contactus-text' id='faqsId'>FAQs</p>
                    </div> 
                )}               
            </div>
        </div>
    );
};

export default SettingsModal;