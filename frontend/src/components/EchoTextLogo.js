const EchoTextLogo = (props) =>{
    const alt= "image of echo logo";
    return(
        <div style={{alignContent : 'left'}}>
            <img src={props.echoLogo} alt={alt} width={100} height={100}></img>
        </div>
        
    );
}

export default EchoTextLogo;