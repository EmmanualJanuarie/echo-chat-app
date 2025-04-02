import '../styles/Signin.css';
import '../styles/FormCard.css';
import React, { useState } from 'react';
import Input from '../components/Input';
import FormCard from '../components/FormCard';
import { Link, useNavigate } from 'react-router-dom';
import HeaderText from '../components/HeaderText';
import Button from '../components/Button';
import DirectionMsg from '../components/DirectionMsg';
import ArrowButton from '../components/ArrowButton';

const SignUp = () =>{

   
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [tel, setTel] = useState();
    const [pic, setPic] = useState();

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
                <HeaderText content={'Sign Up'} fontSize={'40px'} color={'black'} marginBottom={'20px'}/>   

                    {/* Input for Email */}
                <Input backgroundColor={'white'}
                    input={{
                        type: 'email',
                        placeholder: 'Email',
                        name: 'email',
                        onChange: (e) =>setEmail(e.target.value),
                        value: email,
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
                        name: 'password',
                        onChange: (e) =>setPassword(e.target.value),
                        value: password,
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
                        placeholder: 'Confirm Password',
                        name: 'password',
                        onChange: (e) =>setConfirmPassword(e.target.value),
                        value: confirmPassword,
                        backgroundColor: 'white', 
                        border: '2px solid black',
                        marginTop: '0px',
                        marginBottom: '20px'
                    }}
                />

                {/* input for tel */}
                <Input backgroundColor={'white'}
                    input={{
                        type: 'tel',
                        placeholder: '(+27) XXX - XXX - XXXX',
                        name: 'tel',
                        onChange: (e) =>setTel(e.target.value),
                        value: tel,
                        backgroundColor: 'white', 
                        border: '2px solid black',
                        marginTop: '0px',
                        marginBottom: '20px'
                    }}
                />

                <Button type={'submit'} backgroundColor={'black'} width={'100%'} color={'white'} content={'Continue'}/>

                <DirectionMsg content={"Have an account?"} toMsg={
                     <Link to="/signin" style={{ textDecoration: 'none', color: 'black' }}>Sign In</Link>
                } color={'black'}
                    fontWeight={'bold'}  marginTop={'20px'}
                />
            </FormCard>
        </div>
    );
}

export default SignUp;