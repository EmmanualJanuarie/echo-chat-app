function Card(props){
    const cardStyle = {
        color: props.color,
        borderRadius: props.borderRadius,
        backgroundColor: props.backgroundColor,
        height: props.height
    }
    return(
        <div>
            <div className="card" style={cardStyle}>
                <div className="card-content">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Card;