function GroupIcon(props){
    const GroupIconStyle = {
        color: props.color
    }
    return(
    <div>
        <i style={GroupIconStyle} class="fa-solid fa-user-group"></i>
    </div>
    );
}

export default GroupIcon;