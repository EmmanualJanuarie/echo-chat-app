import '../../App.css';
function GroupIcon(props){
    const GroupIconStyle = {
        color: props.color,
        position: props.position,
        textAlign: props.textAlign,
        left: props.left,
        bottom:props.bottom,
        fontSize: props.fontSize
    }
    return(
    <div className="icon-hover">
        <i style={GroupIconStyle} className="fa-solid fa-user-group" onClick={props.onClick}></i>
    </div>
    );
}

export default GroupIcon;