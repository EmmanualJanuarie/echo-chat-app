function Input({input}){
    return(
        <div>
            <div className="card">
                <div className="card-content">
                <form>
                    <input className="input is-rounded" 
                        type={input.type} 
                        placeHolder={input.placeHolder}
                        name={input.name}
                    />
                </form> 
                </div>
            </div>
            
        </div>
    );
}

export default Input;