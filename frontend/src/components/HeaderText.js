function HeaderText(props) {

    const headerStyle = {
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        fontSize: props.fontSize,
        color: props.color
    };
    const content = props.content;

    return(
        <div>
            <h1 style={headerStyle}>
                {content}
            </h1>
            <p className="hz_line">
                <hr />
            </p>
        </div>
    );
};

export default HeaderText;