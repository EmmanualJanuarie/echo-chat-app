import Input from '../components/Input';
import FormCard from '../components/FormCard';
import HeaderText from '../components/HeaderText';
import Button from '../components/Button';
import ArrowButton from '../components/ArrowButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopUp from '../components/PopUp';
import axios from 'axios';
import '../styles/Signin.css';
import '../styles/FormCard.css';
import '../App.css';

function ResetPassword(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
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

    const submitHandler = async (e) =>{
        e.preventDefault();

        if (!email || !password || !repeatPassword) {
            showPopUpMessage('Please fill in all the fields!', 'yellow', 'absolute');
            return;
        }

        if (password !== repeatPassword) {
            showPopUpMessage('Password does not match!', 'yellow', 'absolute');
            return;
        }

        console.log(email, password);

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            
            const { data } = await axios.put(
                `http://localhost:5000/api/user/${email}/reset-password`, // Updated URL
                {
                    password,
                },
                config
            );
            
            
            showPopUpMessage('Password changed', 'green');
            console.log(data);

            // Clears form
            setEmail('');
            setPassword('');
            setRepeatPassword('');
            
            localStorage.setItem("newPwd", JSON.stringify(data));
            // navigate("/chats");
        } catch (error) {
            console.error("Error details:", error.response ? error.response.data : error.message);
            showPopUpMessage('Error Occurred: ' + (error.response ? error.response.data.message : error.message), 'red');
        }
    }

    return(
        <div>
            {showPopUp && <PopUp content={popUpContent} color={'black'} backgroundColor={popUpColor} position={popUpPosition}/>}
            <FormCard backgroundColor={'transparent'} border={'2px solid black'} contentWidth={'20%'}
                    innerCard={{
                        backgroundColor:'white'
                    }}
                    
                >
                    {/* Adding arrow button */}
                <ArrowButton linkComp={'/signin'}/>

                    {/* header component */}
                <HeaderText content={'Reset Password'} fontSize={'40px'} color={'black'} marginBottom={'20px'}/>   
                <form onSubmit={submitHandler}>
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
                        marginBottom: '20px',
                        color: 'black'
                    }}
                />

                    {/* input for pwd */}
                <Input backgroundColor={'white'}
                    input={{
                        type: 'password',
                        placeholder: 'New Password',
                        name: 'password',
                        onChange: (e) =>setPassword(e.target.value),
                        value: password,
                        backgroundColor: 'white', 
                        border: '2px solid black',
                        marginTop: '0px',
                        marginBottom: '20px',
                        color: 'black'
                    }}
                />

                <Input backgroundColor={'white'}
                    input={{
                        type: 'password',
                        placeholder: 'Repeat Password',
                        name: 'repeatpassword',
                        onChange: (e) =>setRepeatPassword(e.target.value),
                        value: repeatPassword,
                        backgroundColor: 'white', 
                        border: '2px solid black',
                        marginTop: '0px',
                        marginBottom: '20px',
                        color: 'black'
                    }}
                />

                <Button type={'submit'} backgroundColor={'black'} width={'100%'} color={'white'} content={'Reset Password'}/>
                    </form>
            </FormCard>
        </div>
    );
}

export default ResetPassword;