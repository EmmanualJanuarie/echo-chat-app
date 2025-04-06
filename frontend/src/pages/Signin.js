import React, { useState } from 'react';
import '../styles/Signin.css';
import '../styles/FormCard.css';
import Input from '../components/Input';
import FormCard from '../components/FormCard';
import HeaderText from '../components/HeaderText';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import DirectionMsg from '../components/DirectionMsg';
import axios from 'axios';
import PopUp from '../components/PopUp';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [popUpContent, setPopUpContent] = useState('');
    const [popUpPosition, setPopUpPosition] = useState('');
    const [popUpColor, setPopUpColor] = useState('');
    const [showPopUp, setShowPopUp] = useState(false);

    const navigate = useNavigate();
    const showPopUpMessage = (content, color, position) => {
        setPopUpContent(content);
        setPopUpColor(color);
        setPopUpPosition(position);
        setShowPopUp(true);
        setTimeout(() => setShowPopUp(false), 4000); // Hide after 3 seconds
    };

     // function for submitHandler
     const submitHandler = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!email || !password) {
            showPopUpMessage('Please fill in all the fields!', 'yellow', 'absolute');
            return;
        }

        console.log(email, password);

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                'http://localhost:5000/api/user/signin', // Update this URL as needed
                {
                    email,
                    password,
                },
                config
            );
            console.log(data);

            // Clears form
            setEmail('');
            setPassword('');

            localStorage.setItem("userInfo", JSON.stringify(data));
            showPopUpMessage('Successfully Signed In', 'green');
            navigate('/chat');

        } catch (error) {
            showPopUpMessage('Error Occurred: ' + (error.response ? error.response.data.message : error.message), 'red');
        }
    };
 
return (
        <div>
             {showPopUp && <PopUp content={popUpContent} color={'black'} backgroundColor={popUpColor} position={popUpPosition}/>}
            <FormCard backgroundColor={'transparent'} border={'2px solid black'} contentWidth={'20%'}
                innerCard={{
                    backgroundColor: 'white'
                }}
            >
                {/* Header component */}
                <HeaderText content={'Sign In'} fontSize={'40px'} color={'black'} marginBottom={'20px'} />

                    {/* Input for Email */}
                    <Input backgroundColor={'white'}
                        input={{
                            type: 'email',
                            placeholder: 'Email',
                            name: 'email',    
                            onChange: (e) => setEmail(e.target.value),
                            value: email,                      
                            backgroundColor: 'white',
                            border: '2px solid black',
                            marginTop: '0px',
                            marginBottom: '20px',
                            color: 'black'
                        }}
                    />

                    {/* Input for Password */}
                    <Input backgroundColor={'white'}
                        input={{
                            type: 'password',
                            placeholder: 'Password',
                            name: 'password',
                            onChange: (e) => setPassword(e.target.value),
                            value: password,
                            backgroundColor: 'white',
                            border: '2px solid black',
                            marginTop: '0px',
                            marginBottom: '20px',
                            color: 'black'
                        }}
                    />

                    <Button type={'submit'} backgroundColor={'black'} width={'100%'} color={'white'} content={'Sign In'} 
                        onClick={submitHandler}
                    />
                
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
            </FormCard>
        </div>
    );
}

export default Signin;