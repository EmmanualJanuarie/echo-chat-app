import '../styles/Input.css';

function Input({input}){

    const inputStyle = {
        backgroundColor: input.backgroundColor,
        border: input.border,
        marginTop: input.marginTop,
        marginBottom: input.marginBottom,
        position: input.position,
        bottom: input.position,
        borderRadius: input.borderRadius,
        boxShadow: input.boxShadow,
        height: input.height
    }
    return(
        <div>
            <input className="input is-rounded" style={inputStyle}
                type={input.type} 
                placeHolder={input.placeholder}
                name={input.name}
                onChange={input.onChange}
                value={input.value}
            />  
        </div>
    );
}

export default Input;