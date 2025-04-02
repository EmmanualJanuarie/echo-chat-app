import '../../App.css';
function CallIcon(props){
    const CallIconStyle = {
        color: props.color,
        position: props.position,
        textAlign: props.textAlign,
        left: props.left,
        bottom:props.bottom,
        fontSize: props.fontSize
    }
    return(
    <div className="icon-hover">
        <i style={CallIconStyle} className="fa-solid fa-phone"></i>
    </div>
    );
}

export default CallIcon;