import '../../App.css';
function Clip(props, handleImageChange){
    const ClipIconStyle = {
        color: props.color,
        position: props.position,
        textAlign: props.textAlign,
        left: props.left,
        bottom:props.bottom,
        fontSize: props.fontSize
    }
    return(
    <div className="icon-hover">
         <input
                type="file"
                accept="image/*"
                onChange={ <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }} // Hide the input
                    id="imageInput" // Give it an ID for reference
                />}
                style={{ display: 'none' }} // Hide the input
                id="imageInput" // Give it an ID for reference
            />
        <i style={ClipIconStyle} className="fa-solid fa-paperclip"
        onClick={() => document.getElementById('imageInput').click()}></i>
    </div>
    );
}

export default Clip;