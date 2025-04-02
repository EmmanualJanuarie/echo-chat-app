import '../styles/Signin.css';
import '../styles/FormCard.css';
import React, { useState } from 'react';
import Input from '../components/Input';
import FormCard from '../components/FormCard';
import HeaderText from '../components/HeaderText';
import Button from '../components/Button';
import DirectionMsg from '../components/DirectionMsg';
import Avatar from '../components/chatPageComponents/Avatar';
import ArrowButton from '../components/ArrowButton';
import avatarImg from '../assets/default_avatar.png'; 
import uploadImage from '../utils/uploadImg.js';
import PopUp from '../components/PopUp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const UserProfile = ({ formData, handlePicChange }) =>{

    const navigate = useNavigate();
    const [name, setName] = useState(formData.name || ''); // Initialize state with formData
    const [bio, setBio] = useState(formData.bio || ''); // Initialize state with formData
    const [pic, setPic] = useState(formData.pic || ''); // Initialize state with formData

     const postDetails = async (pics) =>{
        const imageUrl = await uploadImage(pics);
            if (imageUrl) {
                handlePicChange(imageUrl); // Update the parent state with the image URL
                setPic(imageUrl);
            } else {
                // Handle the case where the image upload failed
                return <PopUp content={'Image upload failed!'} color={'gray'} backgroundColor={'red'} />;
            };
     };

     const submitHandler = async (e) =>{
        e.preventDefault();

        const {bio, pic, name } = formData;

        if (!name || !bio || !pic) {
            return <PopUp content={'Please fill in all fields!'} color={'gray'} backgroundColor={'yellow'} />;
        }

        // Here you can send the profile data to your backend
        console.log({ name, bio, pic });

        try {
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
            const { data } = await axios.post(
              "/api/user",
              {
                name,
                bio,
                pic,
              },
              config
            );
            console.log(data);

            <PopUp content={'Registration Successful.'} color={'gray'} backgroundColor={'green'}/>
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/chats");
        }catch(error){
            <PopUp content={'Error Occured'} color={'gray'} backgroundColor={'red'}/>
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
                <ArrowButton linkComp={'/signup'}/>

                <Avatar src={avatarImg} alt={'Default avatar image'}
                        textAlign={'left'}  
                        height={'100px'} width={'100px'} borderRadius={'50%'} border={'2px solid gray'}
                        objectFit={'cover'} backgroundColor={'white'} marginBottom={'30px'}

                        onChange={(e) => postDetails(e.target.files[0])}
                />

                    {/* Input for Name */}
                <Input backgroundColor={'white'}
                    input={{
                        type: 'text',
                        placeholder: 'Full Name',
                        name: 'name',
                        onChange: (e) =>setName(e.target.value),
                        value: name,
                        backgroundColor: 'white', 
                        border: '2px solid black',
                        marginTop: '0px',
                        marginBottom: '20px'
                    }}
                />

                    {/* input for Bio */}
                <Input backgroundColor={'white'}
                    input={{
                        type: 'text',
                        placeholder: 'Bio',
                        name: 'bio',
                        onChange: (e) =>setBio(e.target.value),
                        value: bio,
                        backgroundColor: 'white', 
                        border: '2px solid black',
                        marginTop: '0px',
                        marginBottom: '20px'
                    }}
                />

       <Button type={'submit'} backgroundColor={'black'} width={'100%'} color={'white'} content={'Create Profile'}
        onClick={submitHandler}/>
            </FormCard>
        </div>
    );

     };
export default UserProfile;