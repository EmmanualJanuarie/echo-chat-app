// import React, { useState } from "react";
// import { ChatState } from "../../Context/ChatProvider";

// const SingleChat = () => {
//     const { selectedChat, setSelectedChat, user, notification, setNotification } = ChatState(); // Call the ChatState function

//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessages] = useState();

//     const [popUpContent, setPopUpContent] = useState('');
//     const [selectedUser, setSelectedUser] = useState(null); // State to track selected user
//     const [popUpPosition, setPopUpPosition] = useState('');
//     const [showPopUp, setShowPopUp] = useState(false);
//     const [popUpColor, setPopUpColor] = useState('');
//     const [loggedUser, setLoggedUser] = useState('');

   

//     const showPopUpMessage = (content, color, position) => {
//         setPopUpContent(content);
//         setPopUpColor(color);
//         setPopUpPosition(position);
//         setShowPopUp(true);
//         setTimeout(() => setShowPopUp(false), 4000); // Hide after 3 seconds
//     };

//     const fetchMessages = async () => {
//         if (!selectedChat) return;
    
//         try {
//           const config = {
//             headers: {
//               Authorization: `Bearer ${user.token}`,
//             },
//           };
    
//           const { data } = await axios.get(
//             `/api/message/${selectedChat._id}`,
//             config
//           );
//           setMessages(data);
//           setLoading(false);
    
//           socket.emit("join chat", selectedChat._id);
//         } catch (error) {
//             showPopUpMessage('Failed to load message!', 'red');
//         }
//       };


//       const sendMessage = async (event) => {
//         if (event.key === "Enter" && newMessage) {
//           socket.emit("stop typing", selectedChat._id);
//           try {
//             const config = {
//               headers: {
//                 "Content-type": "application/json",
//                 Authorization: `Bearer ${user.token}`,
//               },
//             };
//             setNewMessages("");
//             const { data } = await axios.post(
//               "/api/message",
//               {
//                 content: newMessage,
//                 chatId: selectedChat,
//               },
//               config
//             );
//             socket.emit("new message", data);
//             setMessages([...messages, data]);
//           } catch (error) {
//             toast({
//               title: "Error Occured!",
//               description: "Failed to send the Message",
//               status: "error",
//               duration: 5000,
//               isClosable: true,
//               position: "bottom",
//             });
//           }
//         }
//       };
    
//       useEffect(() => {
//         socket = io(ENDPOINT);
//         socket.emit("setup", user);
//         socket.on("connected", () => setSocketConnected(true));
//         socket.on("typing", () => setIsTyping(true));
//         socket.on("stop typing", () => setIsTyping(false));
    
//         // eslint-disable-next-line
//       }, []);
    
//       useEffect(() => {
//         fetchMessages();
    
//         selectedChatCompare = selectedChat;
//         // eslint-disable-next-line
//       }, [selectedChat]);

//       useEffect(() => {
//         socket.on("message recieved", (newMessageRecieved) => {
//           if (
//             !selectedChatCompare || // if chat is not selected or doesn't match current chat
//             selectedChatCompare._id !== newMessageRecieved.chat._id
//           ) {
//             if (!notification.includes(newMessageRecieved)) {
//               setNotification([newMessageRecieved, ...notification]);
//               setFetchAgain(!fetchAgain);
//             }
//           } else {
//             setMessages([...messages, newMessageRecieved]);
//           }
//         });
//       });

//       const typingHandler = (e) => {
//         setNewMessages(e.target.value);
    
//         if (!socketConnected) return;
    
//         if (!typing) {
//           setTyping(true);
//           socket.emit("typing", selectedChat._id);
//         }
//         let lastTypingTime = new Date().getTime();
//         var timerLength = 3000;
//         setTimeout(() => {
//           var timeNow = new Date().getTime();
//           var timeDiff = timeNow - lastTypingTime;
//           if (timeDiff >= timerLength && typing) {
//             socket.emit("stop typing", selectedChat._id);
//             setTyping(false);
//           }
//         }, timerLength);
//       };

//     return (
//         <>
//             {selectedChat ? (
//                 <div>
//                     {!selectedChat.isGroupChat ? (
//                         <div>
//                             {/* Display the user's name for a single chat */}
//                             {selectedChat.users.find(u => u._id !== user._id)?.name}
//                         </div>
//                     ) : (
//                         <div>
//                             {/* Display the group chat name */}
//                             {selectedChat.chatName.toUpperCase()}
//                             {/* For update grop chat modal */}
//                         </div>
//                     )}
//                 </div>
//             ) : (
//                 <div>No chat selected</div> // Optional: Display a message when no chat is selected
//             )}
//         </>
//     );
// };

// export default SingleChat;