import '../styles/FormCard.css';

function FormCard(props){

    const cardStyle = {
        backgroundColor: props.backgroundColor,
        border: props.border,
        innerCard:{
            backgroundColor: props.backgroundColor
        }
    };



    return(
        <div className="outerCard">
            <div className="card card-itemAlign" style={cardStyle}>
                <div className="card-content cardContent-width-70">
                        {props.children}
                </div>
            </div>
        </div>
    );
};

export default FormCard;