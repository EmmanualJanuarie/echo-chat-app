function Avatar(){
    const imageStyle = {
        borderRadius: props.borderRadius,
        border: props.border,
        width: props.width,
        height: props.height,
        objectFit: props.objectFit
    };
    return(
        <div>
            <img 
                src={props.src} 
                alt={props.alt} 
                style={imageStyle} 
            />
        </div>
    );
}

export default Avatar;