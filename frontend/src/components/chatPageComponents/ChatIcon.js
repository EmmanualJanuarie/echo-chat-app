import Dot from "./Dot";
import '../../App.css';
function ChatIcon(props){
    const ChatIconStyle = {
        color: props.color,
        position: props.position,
        textAlign: props.textAlign,
        left: props.left,
        bottom:props.bottom,
        fontSize: props.fontSize
    }
    return(
    <div>
        <Dot borderRadius={'50%'}  height={'10px'}  position={'relative'}/>
        <i style={ChatIconStyle} className="fa-solid fa-comment icon-hover" onClick={props.onClick}></i>
    </div>
    );
}

export default ChatIcon;