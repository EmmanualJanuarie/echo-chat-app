import '../../App.css';
function VideoCallIcon(props){
    const VideoCallIconStyle = {
        color: props.color,
        position: props.position,
        textAlign: props.textAlign,
        left: props.left,
        bottom:props.bottom,
        fontSize: props.fontSize
    }
    return(
    <div className="icon-hover">
        <i style={VideoCallIconStyle} className="fa-solid fa-video"></i>
    </div>
    );
}

export default VideoCallIcon;