import '../../styles/Avatar.css';
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
        marginBottom: props.marginBottom,
        top:props.top,
        backgroundColor: props.backgroundColor
    };
    return(
        <div className="user-avatar-hover file-upload">
            <label for="file-input" className="file-label">
                <img 
                    src={props.src} 
                    alt={props.alt} 
                    style={imageStyle} 
                />
            </label>
            <input id="file-input" type="file" accept="image/*" class="file-input"  onChange={props.onChnage}></input>
        </div>
    );
}

export default Avatar;