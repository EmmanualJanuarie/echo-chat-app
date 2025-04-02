function Columns(props){
    const columnStyle= {
        gap: props.gap,
        display: props.display,
        justifyCcontent: props.justifyCcontent,
        textAlign: props.textAslign,
        position: props.position,
        left: props.left,
        right: props.right,
        margin:props.margin,
        padding:props.padding
    }
    return(
        <div className="columns" style={columnStyle}>
            {props.children}
        </div>
    );
}

export default Columns;