import echoLogo from '../assets/echo_logo.png'; 

const MainLogo = () =>{
    const alt= "image of echo logo";
    return(
        <div style={{alignContent : 'center'}}>
         <img src={echoLogo} alt={alt} width={960} height={960}></img>
        </div>
        
    );
}

export default MainLogo;