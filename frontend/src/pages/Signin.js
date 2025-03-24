import '../styles/Signin.css'
import Input from '../components/Input';
import FormCard from '../components/FormCard';
import Header from '../components/Header';
import Button from '../components/Button';
import DirectionMsg from '../components/DirectionMsg';
import ArrowButton from '../components/ArrowButton';

const Signin = () =>{
    return(
        <div className="outerCard">
            <FormCard backgroundColor={'transparent'} border={'2px solid black'} width={'500px'} contentWidth={'20%'}
                    innerCard={{
                        backgroundColor:'white'
                    }}
                    
                >
                    {/* Adding arrow button */}
                <ArrowButton />

                    {/* header component */}
                <Header content={'Sign In'} fontSize={'40px'} color={'black'} marginBottom={'20px'}/>   

                    {/* Input for Email */}
                <Input backgroundColor={'white'}
                    input={{
                        type: 'email',
                        placeholder: 'Email',
                        name: 'email',
                        backgroundColor: 'white', 
                        border: '2px solid black',
                        marginTop: '0px',
                        marginBottom: '20px'
                    }}
                />

                    {/* input for pwd */}
                <Input backgroundColor={'white'}
                    input={{
                        type: 'password',
                        placeholder: 'Password',
                        name: 'pwd',
                        backgroundColor: 'white', 
                        border: '2px solid black',
                        marginTop: '0px',
                        marginBottom: '20px'
                    }}
                />

                <Button type={'submit'} backgroundColor={'black'} width={'100%'} color={'white'} content={'Sign In'}/>

                <DirectionMsg content={"Don't have an account?"} toMsg={'Sign Up'} color={'black'}
                    fontWeight={'bold'}  marginTop={'20px'}
                />

                <DirectionMsg content={'Forgot Password'} color={'black'}
                    fontWeight={'bold'}  textDecoration={'underline'} marginTop={'20px'}
                />
            </FormCard>
        </div>
    );
}

export default Signin;