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
import axios from 'axios';
import PopUp from '../components/PopUp';

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [tel, setTel] = useState('');
    const [pic, setPic] = useState('');
    const [popUpContent, setPopUpContent] = useState('');
    const [popUpPosition, setPopUpPosition] = useState('');
    const [popUpColor, setPopUpColor] = useState('');
    const [showPopUp, setShowPopUp] = useState(false);

    const showPopUpMessage = (content, color, position) => {
        setPopUpContent(content);
        setPopUpColor(color);
        setPopUpPosition(position);
        setShowPopUp(true);
        setTimeout(() => setShowPopUp(false), 4000); // Hide after 3 seconds
    };

    const submitHandler = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!tel || !email || !password || !confirmPassword) {
            showPopUpMessage('Please fill in all the fields!', 'yellow', 'absolute');
            return;
        }

        if (password !== confirmPassword) {
            showPopUpMessage('Password does not match!', 'yellow', 'absolute');
            return;
        }

        console.log(tel, email, password, pic);

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                'http://localhost:5000/api/user', // Update this URL as needed
                {
                    flname: 'default name',
                    email,
                    password,
                    tel,
                    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
                    bio: 'Default Bio',
                },
                config
            );
            console.log(data);

            localStorage.setItem("userInfo", JSON.stringify(data));
            localStorage.setItem("userEmail", email);
            navigate("/userprofile");
        } catch (error) {
            console.error("Error details:", error.response ? error.response.data : error.message);
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

                {/* Adding arrow button */}
                <ArrowButton linkComp={'/signin'} />

                {/* header component */}
                < HeaderText content={'Sign Up'} fontSize={'40px'} color={'black'} marginBottom={'20px'} />
                <form onSubmit={submitHandler}>

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

                    {/* Input for Confirm Password */}
                    <Input backgroundColor={'white'}
                        input={{
                            type: 'password',
                            placeholder: 'Confirm Password',
                            name: 'confirmPassword',
                            onChange: (e) => setConfirmPassword(e.target.value),
                            value: confirmPassword,
                            backgroundColor: 'white',
                            border: '2px solid black',
                            marginTop: '0px',
                            marginBottom: '20px',
                            color: 'black'
                        }}
                    />

                    {/* Input for Telephone */}
                    <Input backgroundColor={'white'}
                        input={{
                            type: 'tel',
                            placeholder: '(+27) XXX - XXX - XXXX',
                            name: 'tel',
                            onChange: (e) => setTel(e.target.value),
                            value: tel,
                            backgroundColor: 'white',
                            border: '2px solid black',
                            marginTop: '0px',
                            marginBottom: '20px',
                            color: 'black'
                        }}
                    />

                    <Button type={'submit'} backgroundColor={'black'} width={'100%'} color={'white'} content={'Continue'} />
                </form>

                <DirectionMsg content={"Have an account?"} toMsg={
                    <Link to="/signin" style={{ textDecoration: 'none', color: 'black' }}>Sign In</Link>
                } color={'black'}
                    fontWeight={'bold'} marginTop={'20px'}
                />
            </FormCard>
        </div>
    );
}

export default SignUp;