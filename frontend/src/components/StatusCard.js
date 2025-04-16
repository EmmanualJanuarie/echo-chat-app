const StatusCard = (props) =>{
    return(
        <div>
            <div className="card statusCard">
                <div className="columns">
                    <div className="column is-one-third">
                        <div className="status-image-container">
                            <img className="status-image"
                                src={props.pic || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'} 
                                alt="Avatar" 
                            />
                        </div>
                    </div>
                    <div className="column">
                        <p style={{color: 'white'}}>{props.username || "Username"}</p>
                        <p>{props.datetime || "DateTime"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatusCard;