import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import PopUp from "../PopUp";

const UserChats = ({ fetchAgain }) =>{
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

  
    const fetchChats = async () => {
      // console.log(user._id);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
  
        const { data } = await axios.get("/api/chat", config);
        setChats(data);
      } catch (error) {
        showPopUpMessage('Failed to load chats!', 'yellow', 'absolute');
      }
    };
  
    useEffect(() => {
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
      fetchChats();
      // eslint-disable-next-line
    }, [fetchAgain]);
  
    return (
        <div>
             {showPopUp && <PopUp content={popUpContent} color={'black'} backgroundColor={popUpColor} position={popUpPosition}/>}
        </div>
    //   <Box
    //     d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
    //     flexDir="column"
    //     alignItems="center"
    //     p={3}
    //     bg="white"
    //     w={{ base: "100%", md: "31%" }}
    //     borderRadius="lg"
    //     borderWidth="1px"
    //   >
    //     <Box
    //       pb={3}
    //       px={3}
    //       fontSize={{ base: "28px", md: "30px" }}
    //       fontFamily="Work sans"
    //       d="flex"
    //       w="100%"
    //       justifyContent="space-between"
    //       alignItems="center"
    //     >
    //       My Chats
    //       <GroupChatModal>
    //         <Button
    //           d="flex"
    //           fontSize={{ base: "17px", md: "10px", lg: "17px" }}
    //           rightIcon={<AddIcon />}
    //         >
    //           New Group Chat
    //         </Button>
    //       </GroupChatModal>
    //     </Box>
    //     <Box
    //       d="flex"
    //       flexDir="column"
    //       p={3}
    //       bg="#F8F8F8"
    //       w="100%"
    //       h="100%"
    //       borderRadius="lg"
    //       overflowY="hidden"
    //     >
    //       {chats ? (
    //         <Stack overflowY="scroll">
    //           {chats.map((chat) => (
    //             <Box
    //               onClick={() => setSelectedChat(chat)}
    //               cursor="pointer"
    //               bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
    //               color={selectedChat === chat ? "white" : "black"}
    //               px={3}
    //               py={2}
    //               borderRadius="lg"
    //               key={chat._id}
    //             >
    //               <Text>
    //                 {!chat.isGroupChat
    //                   ? getSender(loggedUser, chat.users)
    //                   : chat.chatName}
    //               </Text>
    //               {chat.latestMessage && (
    //                 <Text fontSize="xs">
    //                   <b>{chat.latestMessage.sender.name} : </b>
    //                   {chat.latestMessage.content.length > 50
    //                     ? chat.latestMessage.content.substring(0, 51) + "..."
    //                     : chat.latestMessage.content}
    //                 </Text>
    //               )}
    //             </Box>
    //           ))}
    //         </Stack>
    //       ) : (
    //         <ChatLoading />
    //       )}
    //     </Box>
    //   </Box>
    );
}

export default UserChats;