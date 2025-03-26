function Column(props){

    const columnStyles = {
        color: props.color,
        fontWeight: props.fontWeight,
        borderRadius: props.borderRadius,

    }
    return(
        <div className="width-is-50">
            <div className="column">
                <span style={columnStyles}>{props.children}</span>
            </div>
        </div>
    );
}

export default Column;