import React  from "react";

const MyChats = (props) => {
    const chatStyling = {
        backgroundColor: props.backgroundColor
    }
    return(
        <div style={chatStyling}>
            My chats
        </div>
    );
};

export default MyChats;