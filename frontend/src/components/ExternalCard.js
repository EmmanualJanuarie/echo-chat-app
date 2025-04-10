import '../styles/ChatAppPage.css';

function ExternalCard(props){
    const cardStyle = {
        backgroundColor: props.backgroundColor,
        border: props.border,
        borderRadius: props.borderRadius,
        height: props.height,
        position: props.position,
        bottom: props.bottom
    };
    return(
        <div className='card-justify-center'>
            <div className="card card-width-95" style={cardStyle}>
                        {props.children}
            </div>
        </div>
    );
}

export default ExternalCard;