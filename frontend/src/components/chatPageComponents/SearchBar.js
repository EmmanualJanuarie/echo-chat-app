import '../../App.css';
function SearchBar(props){
    const inputStyle = {
        backgroundColor: props.backgroundColor,
        border: props.border,
        top: props.top,
        position: props.position
    }
    return(
        <div className="field">
            <p className="control has-icons-left" style={inputStyle}>
                <input className="input is-rounded input-color" type="search" placeholder="Search..." onChange={props.onChange}/>
                <span className="icon is-small is-left">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </span>
            </p>
        </div>
    );
}

export default SearchBar;