import '../../App.css';
function SendIcon(props){
    const SendIconStyle = {
        color: props.color,
        position: props.position,
        textAlign: props.textAlign,
        left: props.left,
        bottom:props.bottom,
        fontSize: props.fontSize
    }
    return(
    <div className="send-icon">
        <i style={SendIconStyle} className="fa-solid fa-paper-plane"></i>
    </div>
    );
}

export default SendIcon;