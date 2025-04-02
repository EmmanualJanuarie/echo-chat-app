import Input from '../components/Input';
import FormCard from '../components/FormCard';
import HeaderText from '../components/HeaderText';
import Button from '../components/Button';
import ArrowButton from '../components/ArrowButton';
import '../styles/Signin.css';
import '../styles/FormCard.css';
import '../App.css';

function ResetPassword(){
    return(
        <div>
            <FormCard backgroundColor={'transparent'} border={'2px solid black'} contentWidth={'20%'}
                    innerCard={{
                        backgroundColor:'white'
                    }}
                    
                >
                    {/* Adding arrow button */}
                <ArrowButton linkComp={'/signin'}/>

                    {/* header component */}
                <HeaderText content={'Reset Password'} fontSize={'40px'} color={'black'} marginBottom={'20px'}/>   

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
                        placeholder: 'New Password',
                        name: 'pwd',
                        backgroundColor: 'white', 
                        border: '2px solid black',
                        marginTop: '0px',
                        marginBottom: '20px'
                    }}
                />

                <Input backgroundColor={'white'}
                    input={{
                        type: 'password',
                        placeholder: 'Repeat Password',
                        name: 'pwd',
                        backgroundColor: 'white', 
                        border: '2px solid black',
                        marginTop: '0px',
                        marginBottom: '20px'
                    }}
                />

                <Button type={'submit'} backgroundColor={'black'} width={'100%'} color={'white'} content={'Reset Password'}/>
            </FormCard>
        </div>
    );
}

export default ResetPassword;