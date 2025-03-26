import echoLogo from '../assets/echo_text_logo.png'; 

const EchoTextLogo = () =>{
    const alt= "image of echo logo";
    return(
        <div style={{alignContent : 'left'}}>
            <img src={echoLogo} alt={alt} width={100} height={100}></img>
        </div>
        
    );
}

export default EchoTextLogo;