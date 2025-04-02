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

const SignUp = () =>{
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [tel, setTel] = useState();
    const [pic, setPic] = useState();

    const submitHandler = async () =>{
        if (!tel || !email || !password || !confirmPassword) {
            <PopUp content={'Please fill in all the fields!'} color={'gray'} backgroundColor={'yellow'}/>
            return;
        }

        if(password !== confirmPassword){
            <PopUp content={'Password does not match!'} color={'gray'} backgroundColor={'yellow'}/>
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
              "/user",
              {
                // name,
                email,
                password,
                pic,
              },
              config
            );
            console.log(data);

            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/userprofile");
        }catch(error){
            <PopUp content={'Error Occured'} color={'gray'} backgroundColor={'red'}/>
        }
    };

    const postDetails = (pics) => {
        if(pics===undefined){
            <PopUp content={'Please select an Image!'} color={'gray'} backgroundColor={'yellow'}/>
        }

        if(pics.type === "image/jpeg" || pics.type === "image/png"){
            const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "echo-chat-app");
        data.append("cloud_name", "dnxd86qnx");
        fetch("https://api.cloudinary.com/v1_1/dnxd86qnx/image/upload", {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                setPic(data.url.toString());
                console.log(data.url.toString());
            })
                .catch((err) => {
                console.log(err);
            });
        } else {
            <PopUp content={'Please Select an Image!'} color={'gray'} backgroundColor={'yellow'}/>
        }
    };

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
                        placeholder: 'Password',
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
                        marginBottom: '20px',
                        color: 'black'
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
                        marginBottom: '20px',
                        color: 'black'
                    }}
                />

                <Button type={'button'} backgroundColor={'black'} width={'100%'} color={'white'} content={'Continue'}
                onClick={submitHandler}/>
                </form>


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