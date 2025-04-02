import { Link } from 'react-router-dom';
function ArrowButton(props){
    const linkComp = props.linkComp;
    return(
        <div className="arrowIcon cursor-pointer">
             <Link to={linkComp}><i className="fa-solid fa-left-long"></i></Link>
        </div>
    );
}

export default ArrowButton;