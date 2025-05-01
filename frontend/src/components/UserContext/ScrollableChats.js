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
            dataLength={messages.length}
            loader={<h4>Loading more messages...</h4>}
            scrollableTarget="scrollableDiv"
        >
            <div id="scrollableDiv" className="chat-height" style={{ overflow: 'auto' }}>
                {messages.length === 0 ? (
                    <p>No messages to display</p>
                ) : (
                    messages.map((m, i) => (
                        <div key={m._id} style={{ display: 'flex', justifyContent: m.sender._id === user._id ? 'flex-end' : 'flex-start', margin: '10px 0' }}>
                            <span style={{
                                backgroundColor: m.sender._id === user._id ? "#007bff" : "#f1f1f1",
                                color: m.sender._id === user._id ? "#fff" : "#000",
                                borderRadius: '20px',
                                padding: '10px 15px',
                                maxWidth: "400px",
                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                fontSize: '16px',
                                lineHeight: '1.4',
                                whiteSpace: 'normal',
                                overflowWrap: 'break-word',
                                wordBreak: 'break-all',
                            }}>
                                {isImageUrl(m.content) ? (
                                    <img src={m.content} alt="Uploaded" style={{ maxWidth: '100%', borderRadius: '10px' }} />
                                ) : (
                                    m.content
                                )}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </InfiniteScroll>
    );
}

export default ScrollableChats;
