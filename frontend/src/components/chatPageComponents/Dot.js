function Dot(props){
    const circleStyle = {
        backgroundColor: props.backgroundColor,
        borderRadius: props.borderRadius,
        width: props.width,
        height: props.height,
        position: props.position,
        left: props.left
    };
    return(
        <div>
        <div style={circleStyle}></div>
        </div>
    );
}

export default Dot;