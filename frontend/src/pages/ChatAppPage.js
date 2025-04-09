import ExternalCard from "../components/ExternalCard";
import Header from "../components/Header";
import Columns from "../components/Columns";
import Column from "../components/Column";
import Button from "../components/Button";
import EchoTextLogo from "../components/EchoTextLogo";
import ChatIcon from "../components/chatPageComponents/ChatIcon";
import CallIcon from "../components/chatPageComponents/CallIcon";
import GroupIcon from "../components/chatPageComponents/GroupIcon";
import Heading from "../components/chatPageComponents/Heading";
import VideoCallIcon from "../components/chatPageComponents/VideoCall";
import ElispsesIcon from "../components/chatPageComponents/Elipses";
import SearchBar from "../components/chatPageComponents/SearchBar";
import SendBar from "../components/chatPageComponents/SendBar";
import '../styles/ChatAppPage.css';
import { ChatState } from '../Context/ChatProvider.js'; 
import SearchSection from "../miscellaneous/SearchSection.js";
import Card from "../components/chatPageComponents/Card.js";
import axios from "axios";
import { useEffect } from "react";
import MyChats from "../components/MyChats.js";
import { useState } from "react";
import ProfileModal from "../components/ProfileModal.js";
import PopUp from "../components/PopUp.js";
import { useNavigate } from "react-router-dom";
import UserItems from "../components/UserContext/UserItems.js";
import UserChats from "../components/UserContext/UserChats.js";
import '../styles/selectedUser.css';
import GroupChatModal from "../components/GroupChatModal.js";

function ChatAppPage(){
    const [popUpContent, setPopUpContent] = useState('');
    const [selectedUser, setSelectedUser] = useState(null); // State to track selected user
    const [popUpPosition, setPopUpPosition] = useState('');
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpColor, setPopUpColor] = useState('');

    const { user, chats, setChats } = ChatState();
   

    const showPopUpMessage = (content, color, position) => {
        setPopUpContent(content);
        setPopUpColor(color);
        setPopUpPosition(position);
        setShowPopUp(true);
        setTimeout(() => setShowPopUp(false), 4000); // Hide after 3 seconds
    };

    const [search, setSearch] = useState(''); // State to track search input
    const [searchActive, setSearchActive] = useState(false); // State to track search input
    const [activeCard, setActiveCard] = useState("myChats"); // State to track search input
    const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal visibility
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false); // State to track modal visibility

    const [searchResult, setSearchResult] = useState([]);
    // const [searchLoadingChat, setLoadingChat] = useState([]);

    const navigate = useNavigate();

    const logoutHandler = () =>{
        localStorage.removeItem("userInfo");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("updatedUserInfo");
        localStorage.removeItem("selectedUser");
        navigate('/');
    }

    // Function to handle button clicks
    const handleCardChange = (card) => {
        setActiveCard(card);
    };
    
     // Function to handle image click
     const handleImageClick = () => {
        setIsModalOpen(true); // Open the modal
    };

    // Function to handle add Group button 
    const handleGroupBtnClick = () => {
        setIsGroupModalOpen(true); // Open the modal
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };


    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    // Function to close the modal
    const GroupModelClose = () => {
        setIsModalOpen(false); // Close the modal
    };

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
            setSearchActive(true); // Set search active to true when searching
            setSearchResult(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
            showPopUpMessage('Failed to obtain search results!', 'red');
        }
    };

    // Function to handle selected User
    const handleUserSelect = async (user) => {
        if (user && user._id) {
            setSelectedUser(user);
            localStorage.setItem('selectedUser', JSON.stringify(user)); // Save to localStorage
            await accessChat(user._id);
            console.log(user + user._id);
        } else {
            showPopUpMessage('Invalid user selected!', 'red');
        }
    };
    const accessChat = async (userId) => {
        if (!user || !user.token) {
            showPopUpMessage('User is not authenticated!', 'red');
          return;
        }
    
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
    
          const { data } = await axios.post('http://localhost:5000/api/chat', { userId }, config);
    
          if (!chats.find((c) => c._id === data._id)) {
            setChats((prevChats) => [data, ...prevChats]);
          } else {
            console.log("Chat already exists in the state");
          }
        } catch (error) {
            showPopUpMessage('Failed to access chat!', 'red');
        }
      };
    console.log("Chat Object:", chats); // Debugging line

    useEffect(() => {
        const storedUser  = localStorage.getItem('selectedUser');
        if (storedUser ) {
            setSelectedUser("Stored User: "+JSON.parse(storedUser)); // Set the selected user from localStorage
        }
    }, []);

    return(
        <div>
        {showPopUp && <PopUp content={popUpContent} color={'black'} backgroundColor={popUpColor} position={popUpPosition}/>}
        <ExternalCard backgroundColor={'#f0f2f7'} border={'2px solid black'} borderRadius={'25px'}
            height={'90vh'} position={'absolute'} bottom={'30px'}
        >
            <div className="card-width-98">
                <Header backgroundColor={'white'} margin={'15px'} padding={'0px'} marginBottom={'10px'}
                    borderRadius={'20px 20px 0 0'}
                >
                    <Columns gap={'85%'}>
                        {/* Image of logo - First Column */}
                            <Column>
                                <EchoTextLogo />
                            </Column>

                        {/* Second Column - logo out button */}
                        <Column>
                           <Columns>

                           {/* Account Avatar button */}
                            <Column>
                            <img className="add-cursor header-avatar-size"
                                src={user?.pic} 
                                alt="default-Account-image" 
                                style={{
                                    position: 'absolute', // Change to relative or remove
                                    right: '160px',
                                    bottom: '15px',
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                    height: '50px', // Set a height if needed
                                    border: '2px solid black'
                                }}
                                onClick={handleImageClick} // Handle image click
                             />
                            </Column>

                           {/* Logout button  */}
                            <Column>
                                <Button type={'submit'} backgroundColor={'black'} width={'100%'} height={'35px'} color={'white'} content={'Log Out'}
                                onClick={logoutHandler}/>
                            </Column>
                           </Columns>
                        </Column>
                    </Columns>
                </Header>
            </div>

            {/* Render the ProfileModal if isModalOpen is true */}
            {isModalOpen && <ProfileModal onClose={closeModal} />}

            {/* Render the Group Chat Modal if isModalOpen is true */}
            {isGroupModalOpen && <GroupChatModal onClose={GroupModelClose} />}

            <div className="card-width-98">
                    <Columns  margin={'none'} padding={'none'} position={'relative'} left={'15px'}>
                        {/* First Column */}
                        <div className="width-is-25">
                            <Column>
                                <Header backgroundColor={'white'} margin={'none'} padding={'none'} borderRadius={'0px'}>

                                    <Columns gap={'3%'} position={'relative'} right={'20px'}>
                                        <Column>
                                            <ChatIcon position={'absolute'} textAlign={'left'} bottom={'0px'} fontSize={'30px'} zIndex={'1px'}
                                                onClick={() => handleCardChange("myChats")}
                                            />
                                        </Column>

                                        <Column>
                                            <CallIcon position={'absolute'} textAlign={'left'}  bottom={'0px'} fontSize={'30px'}
                                                onClick={() => handleCardChange("calllogs")}
                                            />
                                        </Column>

                                        <Column>
                                            <GroupIcon position={'absolute'} textAlign={'left'}  bottom={'0px'} fontSize={'30px'}
                                                onClick={() => handleCardChange("groupchats")}
                                            />
                                        </Column>
                                    </Columns>
                                </Header>
                            </Column>
                        </div>
            
                        {/* Second Column */}
                        <div className="width-is-70">
                            <Column>
                                <Header backgroundColor={'white'} margin={'none'} padding={'none'} borderRadius={'0px'}>
                                    <Columns gap={'87%'} position={'relative'} left={'20px'}>
                                        {/* First set of columns */}
                                        <Columns>

                                            {/* Second Column */}
                                            <Column>
                                                <Heading content={'John Doe'} fontSize={'20px'} fontWeight={'bold'} color={'black'}
                                                    position={'absolute'} textAlign={'left'}  bottom={'5px'} left={'80px'}
                                                />
                                                <Heading content={'Last seen 3 hours ago'} fontSize={'15px'} color={'gray'}
                                                    position={'absolute'} textAlign={'left'}  bottom={'-10px'} left={'80px'}
                                                />
                                            </Column>
                                        </Columns>

                                        {/* Second Set of columns */}
                                        <Columns gap={'60%'}>
                                            {/* First Column */}
                                            <Column>
                                                <VideoCallIcon position={'absolute'} textAlign={'left'} bottom={'-3px'} fontSize={'30px'} />
                                            </Column>

                                            {/* Second Column */}
                                            <Column>
                                                <ElispsesIcon position={'absolute'} textAlign={'left'} bottom={'-3px'} fontSize={'30px'} />
                                            </Column>
                                        </Columns>
                                    </Columns>
                                </Header>
                            </Column>
                        </div>

                         {/* Third Column */}
                        <div className="width-is-25">
                            <Column>
                                <Header backgroundColor={'white'} margin={'none'} padding={'none'} borderRadius={'0px'}>
                                    <Heading content={'Notifications'} fontSize={'25px'} fontWeight={'bold'} color={'black'}
                                                        position={'absolute'} textAlign={'left'}  bottom={'5px'} left={'20px'}
                                                    />
                                    </Header>
                            </Column>
                        </div>
                    </Columns>
            </div>

            <div className="card-width-98">
                    <Columns  margin={'none'} padding={'none'} position={'relative'} left={'15px'}>
                    <div className="width-is-25">
                    <Column>
                         {/* First Column */}
                         {activeCard === "myChats" && (
                            <Header backgroundColor={'#f0f2f7'} margin={'none'} padding={'none'} borderRadius={'0px'} height={'70vh'}>
                            <Heading content={'Chats'} fontSize={'30px'} fontWeight={'bold'} color={'black'}
                             position={'absolute'} textAlign={'left'} left={'30px'}/>

                            <SearchBar position={'absolute'} top={'90px'} onChange={(e) => handleSearch(e.target.value)}/>

                            {/* Conditional rendering based on searchActive state */}
                                                    
                            {searchActive ? (
                            <div className="card-style">
                                <Card color={'white'} position={'absolute'} backgroundColor={'#f0f2f7'}>
                                    <SearchSection>
                                        {searchResult.length > 0 ? (
                                            searchResult.map(user => (
                                                <UserItems 
                                                    key={user._id}
                                                    user={user}
                                                    handleFunction={() => handleUserSelect(user)}
                                                />
                                            ))
                                        ) : (
                                            <div>
                                                {selectedUser  && (
                                                    <div className="chat-card selected-card-style">
                                                        <div className="chat-header">
                                                            <img src={selectedUser.pic} alt="User  Avatar" className="avatar" />
                                                            <div className="user-info">
                                                                <h3 className="username"><b>{selectedUser.flname}</b></h3>
                                                                <p className="timestamp">{formatTime(selectedUser.updatedAt)}</p>
                                                            </div>
                                                        </div>
                                                        <div className="chat-message">
                                                            <p>Hello! How are you today?</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </SearchSection>
                                </Card>
                            </div>
                        ) : null}

                        </Header>
                        )}

                        {activeCard === "calllogs" && (
                        
                        <Header backgroundColor={'#f0f2f7'} margin={'none'} padding={'none'} borderRadius={'0px'} height={'70vh'}>
                            <Heading content={'Call Logs'} fontSize={'30px'} fontWeight={'bold'} color={'black'}
                            position={'absolute'} textAlign={'left'} left={'30px'}/>
                            
                            {/* Add Call log logic here */}

                        </Header>
                        )}

                        {activeCard === "groupchats" && (
                         <Header backgroundColor={'#f0f2f7'} margin={'none'} padding={'none'} borderRadius={'0px'} height={'70vh'}>
                            <Columns gap={'55%'}>
                                <Column>
                                <Heading content={'Group Chats'} fontSize={'30px'} fontWeight={'bold'} color={'black'}
                                    position={'absolute'} textAlign={'left'} left={'30px'}/>
                                </Column>
                                
                                <Column>
                                <Button type={'button'} backgroundColor={'black'}  color={'white'} content={'Add Group'}
                                onClick={handleGroupBtnClick}/>
                                </Column>
                            </Columns>
                                    {/* Add Group Chats logic here */}
                                    <div className="card-style">
                                    <Card color={'white'} position={'absolute'} backgroundColor={'red'} />
                                </div>
                        </Header>
                        )}
                    </Column>
                    </div>
                       
            
                        {/* Second Column */}
                        <div className="width-is-70">
                            <Column>
                                <Header backgroundColor={'white'} margin={'none'} padding={'none'} borderRadius={'0px'} height={'62vh'}>
                                    {/* chatting here */}
                                </Header>

                                <Header backgroundColor={'white'} margin={'none'} padding={'none'} borderRadius={'0px'}>
                                    {/* send reply */}
                                    <SendBar />
                                </Header>
                            </Column>
                        </div>

                         {/* Third Column */}
                        <div className="width-is-25">
                            <Column>
                                <Header backgroundColor={'white'} margin={'none'} padding={'none'} borderRadius={'0px'} height={'70vh'}>
                                    
                                </Header>
                            </Column>
                        </div>
                    </Columns>
            </div>

            
        </ExternalCard>
    </div>
    );
}

export default ChatAppPage;