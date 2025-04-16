import { Cursor } from 'mongoose';
import '../../styles/Card.css';
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
        height: props.height,
        marginBottom: props.marginBottom
    }
    return(
            <div>
                <div className="card" style={cardStyle} onClick={props.onClick}>
                    {props.children}
                </div>
            </div>
            
    );
}

export default Card;