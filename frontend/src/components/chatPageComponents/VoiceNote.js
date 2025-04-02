import '../../App.css';
function VoiceNote(props){
    const VoiceNoteIconStyle = {
        color: props.color,
        position: props.position,
        textAlign: props.textAlign,
        left: props.left,
        bottom:props.bottom,
        fontSize: props.fontSize
    }
    return(
    <div className="icon-hover">
        <i style={VoiceNoteIconStyle} className="fa-solid fa-microphone"></i>
    </div>
    );
}

export default VoiceNote;