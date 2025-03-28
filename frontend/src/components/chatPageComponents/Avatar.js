function Avatar(props){
    const imageStyle = {
        borderRadius: props.borderRadius,
        border: props.border,
        width: props.width,
        height: props.height,
        objectFit: props.objectFit,
        position: props.position,
        left: props.left,
        bottom:props.bottom,
        top:props.top,
        backgroundColor: props.backgroundColor
    };
    return(
        <div className="user-avatar-hover">
            <img 
                src={props.src} 
                alt={props.alt} 
                style={imageStyle} 
            />
        </div>
    );
}

export default Avatar;