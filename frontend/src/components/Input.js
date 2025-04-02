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
        height: input.height,
        color: input.color
    }
    return(
        <div>
            <input className="input is-rounded" style={inputStyle}
                type={input.type} 
                placeholder={input.placeholder}
                name={input.name}
                onChange={input.onChange}
                value={input.value}
            />  
        </div>
    );
}

export default Input;