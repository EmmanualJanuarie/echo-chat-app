function VideoCallIcon(props){
    const VideoCallIconStyle = {
        color: props.color
    }
    return(
    <div>
        <i style={VideoCallIconStyle} class="fa-solid fa-video"></i>
    </div>
    );
}

export default VideoCallIcon;