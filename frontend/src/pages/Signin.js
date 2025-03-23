import '../styles/Signin.css'
import Input from '../components/Input';

const Signin = () =>{
    return(
        <div>
            <Input 
                input={{
                    type:'email',
                    placeHolder:'Email',
                    name:'email'
                }}
            />
        </div>
    );
}

export default Signin;