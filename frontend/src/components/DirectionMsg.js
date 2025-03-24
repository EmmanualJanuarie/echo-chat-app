function DirectionMsg(props){

    const directionMsgStyle =  {
        textDecoration: props.textDecoration,
        marginLeft: props.marginLeft,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        color: props.color
    }

    const optionMsg = {
        fontWeight: props.fontWeight,
        color: props.color,
        textDecoration: props.textDecoration
    }

    const message = props.content;
    const to = props.toMsg;

    return(
        <div>
            <span className="text-underline" style={directionMsgStyle}>{message}</span> <span className="anchors" style={optionMsg}>{to}</span>
        </div>
    );
}

export default DirectionMsg;