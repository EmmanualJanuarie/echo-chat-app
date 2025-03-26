function Columns(props){
    const columnStyle= {
        gap: props.gap,
        display: props.display,
        justifyCcontent: props.justifyCcontent,
        textAlign: props.textAslign,
        position: props.position,
        left: props.left
    }
    return(
        <div>
            <div className="columns" style={columnStyle}>
                {props.children}
            </div>
        </div>
    );
}

export default Columns;