function Button(props){
    const buttonStyle = {
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        fontSize: props.fontSize,
        color: props.color,
        backgroundColor: props.backgroundColor,
        width: props.width,
        height: props.height
    };

    const btnName = props.content;
    return(
        <div>
            <button className="button is-rounded" style={buttonStyle} type={props.type} onSubmit={props.onSubmit} isLoad>
                {btnName}
            </button>
        </div>
    );
}

export default Button;