import '../styles/Input.css';

function Input({input}){

    const inputStyle = {
        backgroundColor: input.backgroundColor,
        border: input.border,
        marginTop: input.marginTop,
        marginBottom: input.marginBottom
    }
    return(
        <div>
            <input className="input is-rounded" style={inputStyle}
                type={input.type} 
                placeHolder={input.placeholder}
                name={input.name}
            />  
        </div>
    );
}

export default Input;