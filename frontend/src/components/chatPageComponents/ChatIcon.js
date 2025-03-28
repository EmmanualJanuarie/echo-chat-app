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
        <Dot backgroundColor={'red'} borderRadius={'50%'} width={'10px'} height={'10px'} 
             position={'absolute'} left={'60px'}/>
        <i style={ChatIconStyle} className="fa-solid fa-comment icon-hover"></i>
    </div>
    );
}

export default ChatIcon;