function ElispsesIcon(props){
    const ElipsesIconStyle = {
        color: props.color
    }
    return(
    <div>
        <i style={ElipsesIconStyle} class="fa-solid fa-ellipsis"></i>
    </div>
    );
}

export default ElispsesIcon;