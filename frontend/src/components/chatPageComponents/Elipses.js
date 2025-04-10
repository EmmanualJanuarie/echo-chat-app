import '../../App.css';
function ElispsesIcon(props){
    const ElipsesIconStyle = {
        color: props.color,
        position: props.position,
        textAlign: props.textAlign,
        left: props.left,
        bottom:props.bottom,
        fontSize: props.fontSize
    }
    return(
    <div className="icon-hover">
        <i style={ElipsesIconStyle} className="fa-solid fa-ellipsis" onClick={props.onClick}></i>
    </div>
    );
}

export default ElispsesIcon;