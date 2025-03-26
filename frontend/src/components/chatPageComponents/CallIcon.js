function CallIcon(props){
    const CallIconStyle = {
        color: props.color
    }
    return(
    <div>
        <i style={CallIconStyle} class="fa-solid fa-phone"></i>
    </div>
    );
}

export default CallIcon;