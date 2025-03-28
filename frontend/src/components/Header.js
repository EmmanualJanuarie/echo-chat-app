import '../styles/ChatAppPage.css';


function Header(props){
    const headerStyle = {
        backgroundColor: props.backgroundColor,
        borderRadius: props.borderRadius,
        border: props.border,
        margin: props.margin,
        padding: props.padding,
        marginBottom: props.marginBottom,
        borderColor: props.borderColor,
        boxShadow: props.boxShadow,
        height: props.height
    }
    return(
            <div className="card card-width-100" style={headerStyle}>
                <div className="card-content">
                        {props.children}
                </div>
            </div>
    );
}

export default Header;