import InfiniteScroll from 'react-infinite-scroll-component';
import { isLastMessage, isSameSender } from '../../utils/chatSender';
import { ChatState } from '../../Context/ChatProvider';

const ScrollableChats = ({ messages }) =>{

    const { user } = ChatState
    return(
        <InfiniteScroll
        dataLength={messages.length} // Length of the messages array
        loader={<h4>Loading more messages...</h4>} // Loader component
        scrollableTarget="scrollableDiv" // Optional: specify a scrollable container
    >
        <div id="scrollableDiv" style={{ height: '400px', overflow: 'auto' }}>
            {messages && messages.map((m, i) => (
                <div key={m._id} style={{ position: 'relative' }}> {/* Set position relative for the avatar */}
                    {/* Render the message content here */}
                    <div>{m.content}</div> {/* Replace with your message rendering logic */}
    
                    {/* Check if the avatar should be displayed */}
                    {(isSameSender(messages, m, i, user?._id) || isLastMessage(messages, i, user?._id)) && (
                        <img
                            className="add-cursor header-avatar-size"
                            src={user?.pic}
                            alt="default-Account-image"
                            style={{
                                position: 'absolute',
                                right: '160px',
                                bottom: '15px',
                                objectFit: 'cover',
                                borderRadius: '50%',
                                height: '50px',
                                border: '2px solid black'
                            }}
                        />
                    )}

                    <div style={{ display: 'flex', justifyContent: m.sender._id ? 'flex-end' : 'flex-start', margin: '10px 0' }}>
                        <span style={{
                            backgroundColor: m.sender._id ? "#007bff" : "#f1f1f1", // Use a blue color for the sender and light gray for the receiver
                            color: m.sender._id ? "#fff" : "#000", // White text for sender, black for receiver
                            borderRadius: '20px',
                            padding: '10px 15px', // Adjusted padding for better spacing
                            maxWidth: "75%",
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                            position: 'relative',
                            wordWrap: 'break-word', // Ensure long words break to the next line
                            fontSize: '16px', // Font size for readability
                            lineHeight: '1.4', // Line height for better spacing
                        }}>
                            {m.content}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </InfiniteScroll>   
    )
}

export default ScrollableChats;