import React  from "react";

const MyChats = (props) => {
    const chatStyling = {
        backgroundColor: props.backgroundColor
    }
    return(
        <div style={chatStyling}>
            {props.children}
        </div>
    );
};

export default MyChats;