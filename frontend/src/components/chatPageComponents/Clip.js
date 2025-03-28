import '../../App.css';
function Clip(props){
    const ClipIconStyle = {
        color: props.color,
        position: props.position,
        textAlign: props.textAlign,
        left: props.left,
        bottom:props.bottom,
        fontSize: props.fontSize
    }
    return(
    <div className="icon-hover">
        <i style={ClipIconStyle} className="fa-solid fa-paperclip"></i>
    </div>
    );
}

export default Clip;