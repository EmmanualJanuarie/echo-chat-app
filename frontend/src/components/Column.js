function Column(props){

    const columnStyles = {
        color: props.color,
        fontWeight: props.fontWeight,
        borderRadius: props.borderRadius,
        position: props.position

    }
    return(
            <div className="column">
                <span style={columnStyles}>{props.children}</span>
            </div>
    );
}

export default Column;