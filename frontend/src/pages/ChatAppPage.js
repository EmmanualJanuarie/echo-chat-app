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
import ProfileModal from "../components/modals/ProfileModal.js";
import PopUp from "../components/PopUp.js";
import { useNavigate } from "react-router-dom";
import UserItems from "../components/UserContext/UserItems.js";
import '../styles/selectedUser.css';
import GroupChatModal from "../components/modals/GroupChatModal.js";
import { getSender , getSenderFull} from "../utils/chatSender.js";
import UserModal from "../components/modals/UserModal.js";
import Spinner from "../components/Spinner.js";
import ScrollableChats from "../components/UserContext/ScrollableChats.js";
import '../styles/MessageSection.css';

function ChatAppPage(){
    const [popUpContent, setPopUpContent] = useState('');
    const [selectedUser, setSelectedUser] = useState(null); // State to track selected user
    const [popUpPosition, setPopUpPosition] = useState('');
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpColor, setPopUpColor] = useState('');
    const [loggedUser, setLoggedUser] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState();



    const { user, chats, setChats, selectedChat,setSelectedChat,  setNotification, notification  } = ChatState();
   

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
    const [isUserModalOpen, setIsUserModalOpen] = useState(false); // State to track modal visibility
    const [imageFile, setImageFile] = useState('');

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

    // Function to handle add Group button 
    const handleUserClick = () => {
        setIsUserModalOpen(true); // Open the modal
    };

    // Function to handle image selection
const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        setImageFile(file);
    }
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

    const UserModelClose = (e) => {
        setIsModalOpen(false); // Close the modal
        e.preventDefault();
    };

    const fetchMessages = async (event) =>{
        if(!selectedChat) return;

        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
            }; 

              setLoading(true);
              const { data } = await axios.get(`http://localhost:5000/api/message/${selectedChat._id}`, 
                config);

            console.log(messages);
            
            setMessages(data);
            setLoading(false);
        } catch (error) {
            showPopUpMessage("Failed to load message", "yellow");
        }
    }

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
    
                const { data } = await axios.post('http://localhost:5000/api/message', {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config);
    
                console.log(data);
                setMessages([...messages, data]);
            } catch (error) {
                console.error("Error sending message:", error);
                showPopUpMessage("Failed to send message", "yellow");
            }
        }
    }

    const sendImage = async (imageFile) => {
        if (!imageFile) {
            console.error("No image file selected");
            showPopUpMessage("Please select an image to send!", "red");
            return; // Exit the function if no image is selected
        }
    
        if (!selectedChat) {
            console.error("No chat selected");
            showPopUpMessage("No chat selected!", "red");
            return; // Exit the function if no chat is selected
        }
    
        try {
            const formData = new FormData();
            formData.append("chatId", selectedChat._id);
            formData.append("image", imageFile); // Append the image file
    
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data", // Change to multipart/form-data
                    Authorization: `Bearer ${user.token}`,
                },
            };
    
            const { data } = await axios.post('http://localhost:5000/api/message', formData, config);
    
            console.log(data);
            setMessages((prevMessages) => [...prevMessages, data]); // Update messages with the new image message
            showPopUpMessage("Image sent successfully!", "green"); // Optional success message
        } catch (error) {
            console.error("Error sending image:", error);
            showPopUpMessage("Failed to send image", "yellow");
        }
    };

    const typingHandler = (e) => {
        if (e && e.target) {
            setNewMessage(e.target.value);
        } else {
            console.error("Event is undefined or does not have a target");
        }
    }

    const handleUserSelect = async (user) => {
        if (user && user._id) {
            setSelectedUser (user);
            localStorage.setItem('selectedUser ', JSON.stringify(user)); // Save to localStorage
            
            // Await the result of accessChat
            const chat = await accessChat(user._id);
            
            // Check if chat is valid before setting it
            if (chat) {
                setSelectedChat(chat); // Set the selected chat here
                console.log("Selected chat:", chat);
            } else {
                console.error("Failed to access chat");
                showPopUpMessage("Failed to access chat!", "red");
            }
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

          return data;
        } catch (error) {
            showPopUpMessage('Failed to access chat!', 'red');
        }
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

    useEffect(()=>{
        fetchMessages();
    }, [selectedChat])

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

            {/* Render the User Chat Modal if isModalOpen is true */}
            {isUserModalOpen && <UserModal onClose={UserModelClose} selectedUser={selectedUser} />}

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
                                            <Heading content={selectedUser  ? selectedUser.flname : null} fontSize={'20px'} fontWeight={'bold'} color={'black'}
                                                position={'absolute'} textAlign={'left'}  bottom={'5px'} left={'80px'}
                                            />
                                                <Heading content={selectedUser  ? `Last seen at ${formatTime(selectedUser.updatedAt)}` : null} fontSize={'15px'} color={'gray'}
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
                                                <ElispsesIcon position={'absolute'} textAlign={'left'} bottom={'-3px'} fontSize={'30px'} 
                                                onClick={handleUserClick} />
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
                                           null
                                        )}

                                        <div>
                                                {selectedUser  && (
                                                    <div className="chat-card selected-card-style">
                                                        <div className="chat-header">
                                                            <img src={selectedUser.pic} alt="User  Avatar" className="avatar" />
                                                            <div className="user-info">
                                                                <h3 className="username"><b>{selectedUser.flname}</b></h3>
                                                                <p className="timestamp">{`Last Reply: ${formatTime(selectedUser.updatedAt)}`}</p>
                                                            </div>
                                                        </div>
                                                        <div className="chat-message">

                                                            {chats ? (
                                                                <div>
                                                                    {chats.map(chat => (
                                                                        <div key={chat._id}>
                                                                            {!chat.isGroupChat
                                                                                ? getSender(loggedUser , chat.users)
                                                                                : chat.chatName}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
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
                                    <Card color={'white'} position={'absolute'} backgroundColor={'red'}>
                                    {chats ? (
                                        <div>
                                            {chats.map(chat => (
                                                <Card key={chat._id} color={'white'} position={'absolute'} backgroundColor={'red'}>
                                                    {!chat.isGroupChat
                                                        ? getSender(loggedUser , chat.users)
                                                        : chat.chatName}
                                                </Card>
                                            ))}
                                        </div>
                                    ) : null}
                                    </Card>
                                </div>
                        </Header>
                        )}
                    </Column>
                    </div>
                       
            
                        {/* Second Column */}
                        <div className="width-is-70">
                            <Column>
                            <Header backgroundColor={'white'} margin={'none'} padding={'none'} borderRadius={'0px'} height={'62vh'}>
                                {/* Render Messages */}
                                    <div>
                                        {loading ? (
                                            <Spinner />
                                        ): (
                                            <div>
                                                {/* Messages here */}
                                                <div>
                                                    <ScrollableChats messages={messages} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                               
                            </Header>

                                <Header backgroundColor={'white'} margin={'none'} padding={'none'} borderRadius={'0px'}>
                                    {/* send reply */}
                                    <SendBar 
                                        value={newMessage}
                                        onKeyDown={sendMessage}
                                        onChange={typingHandler}
                                        handleImageChange={handleImageChange}
                                        onClick={sendImage}
                                    />
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