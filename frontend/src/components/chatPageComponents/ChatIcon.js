function ChatIcon(props){
    const ChatIconStyle = {
        color: props.color
    }
    return(
    <div>
        <i style={ChatIconStyle} class="fa-solid fa-comment"></i>
    </div>
    );
}

export default ChatIcon;