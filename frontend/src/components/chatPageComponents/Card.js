import { Cursor } from 'mongoose';
import '../../styles/ChatAppPage.css';
function Card(props){
    const cardStyle = {
        color: props.color,
        borderRadius: props.borderRadius,
        backgroundColor: props.backgroundColor,
        height: props.height,
        border: props.border,
        boxShadow: props.boxShadow,
        position: props.position,
        bottom: props.bottom,
        cursor: props.cursor,
        marginBottom: props.marginBottom
    }
    return(
            <div className="card card-width-95" style={cardStyle} onClick={props.onClick}>
                <div className="card-content">
                    {props.children}
                </div>
            </div>
    );
}

export default Card;