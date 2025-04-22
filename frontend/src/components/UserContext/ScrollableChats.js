import InfiniteScroll from 'react-infinite-scroll-component';
import { ChatState } from '../../Context/ChatProvider';
import '../../styles/MessageSection.css';

const ScrollableChats = ({ messages }) => {
    const { user } = ChatState();

    // Function to check if a string is a valid image URL
    const isImageUrl = (url) => {
        return url.match(/\.(jpeg|jpg|gif|png|svg)$/) != null;
    };

    return (
        <InfiniteScroll
            dataLength={messages.length} // Length of the messages array
            loader={<h4>Loading more messages...</h4>} // Loader component
            scrollableTarget="scrollableDiv" // Optional: specify a scrollable container
        >
            <div id="scrollableDiv" style={{ height: '650px', overflow: 'auto' }}>
    {messages && messages.map((m) => (
        <div key={m._id} style={{ display: 'flex', justifyContent: m.sender._id === user._id ? 'flex-end' : 'flex-start', margin: '10px 0' }}>
            <span style={{
                backgroundColor: m.sender._id === user._id ? "#007bff" : "#f1f1f1", // Blue for sender, light gray for receiver
                color: m.sender._id === user._id ? "#fff" : "#000", // White text for sender, black for receiver
                borderRadius: '20px',
                padding: '10px 15px', // Adjusted padding for better spacing
                maxWidth: "400px", // Set a fixed width to control wrapping
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                fontSize: '16px', // Font size for readability
                lineHeight: '1.4', // Line height for better spacing
                whiteSpace: 'normal', // Allow normal wrapping
                overflowWrap: 'break-word', // Break long words if necessary
                wordBreak: 'break-all', // Break words at any character to ensure wrapping
            }}>
                 {isImageUrl(m.content) ? (
                    <img src={m.content} alt="Uploaded" style={{ maxWidth: '100%', borderRadius: '10px' }} />
                ): (
                    m.content
                )}
            </span>
        </div>
    ))}
</div>
        </InfiniteScroll>
    );
}

export default ScrollableChats;