function Heading(props){
    const headingStyle ={
        color: props.color,
        fontSize: props.fontSize,
        fontWeight: props.fontWeight
    }
    return(
    <div>
        <h1>{props.content}</h1>
    </div>
    );
}

export default Heading;