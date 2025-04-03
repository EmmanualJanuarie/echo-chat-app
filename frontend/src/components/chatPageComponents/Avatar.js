import '../../styles/Avatar.css';

function Avatar(props) {
    const imageStyle = {
        borderRadius: props.borderRadius,
        border: props.border,
        width: props.width,
        height: props.height,
        objectFit: props.objectFit,
        marginBottom: props.marginBottom,
        backgroundColor: props.backgroundColor
    };

    return (
        <div className="user-avatar-hover file-upload">
            <label htmlFor="file-input" className="file-label">
                <img 
                    src={props.src} 
                    alt={props.alt} 
                    style={imageStyle} 
                />
            </label>
            <input 
                id="file-input" 
                type="file" 
                accept="image/*" 
                className="file-input"  
                onChange={props.onChange} // Pass the selected file
                style={{ display: 'none' }} // Hide the input
            />
        </div>
    );
}

export default Avatar;