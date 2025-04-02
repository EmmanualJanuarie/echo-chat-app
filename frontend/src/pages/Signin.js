import React, { useState } from 'react';
import '../styles/Signin.css';
import '../styles/FormCard.css';
import Input from '../components/Input';
import FormCard from '../components/FormCard';
import HeaderText from '../components/HeaderText';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import DirectionMsg from '../components/DirectionMsg';
import ArrowButton from '../components/ArrowButton';

const Signin = () => {
return (
        <div>
            <FormCard backgroundColor={'transparent'} border={'2px solid black'} contentWidth={'20%'}
                innerCard={{
                    backgroundColor: 'white'
                }}
            >
                {/* Header component */}
                <HeaderText content={'Sign In'} fontSize={'40px'} color={'black'} marginBottom={'20px'} />

                <form>
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

                    {/* Input for Password */}
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

                    <Button type={'submit'} backgroundColor={'black'} width={'100%'} color={'white'} content={'Sign In'} />

                    <DirectionMsg content={"Don't have an account?"} toMsg={
                        <Link to="/signup" style={{ textDecoration: 'none', color: 'black' }}>Sign Up</Link>
                    } color={'black'}
                        fontWeight={'bold'} marginTop={'20px'}
                    />

                    <DirectionMsg content={
                        <Link to="/resetpassword" style={{ textDecoration: 'none', color: 'black' }}>Forgot Password</Link>
                    } color={'black'}
                        fontWeight={'bold'} textDecoration={'underline'} marginTop={'20px'}
                        cursor={'pointer'}
                    />
                </form>
            </FormCard>
        </div>
    );
}

export default Signin;