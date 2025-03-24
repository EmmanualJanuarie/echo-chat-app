function FormCard(props){

    const cardStyle = {
        backgroundColor: props.backgroundColor,
        border: props.border,
        width: props.width,
        innerCard:{
            backgroundColor: props.backgroundColor
        }
    };



    return(
        <div>
            <div className="card card-itemAlign" style={cardStyle}>
                <div className="card-content cardContent-width">
                    <form>
                        {props.children}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormCard;