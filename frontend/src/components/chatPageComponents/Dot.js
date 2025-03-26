function Dot(){
    const circleStyle = {
        backgroundColor: props.backgroundColor,
        borderRadius: props.borderRadius,
        width: props.width,
        height: props.height
    };
    return(
        <div>
        <div style={circleStyle}></div>
        </div>
    );
}

export default Dot;