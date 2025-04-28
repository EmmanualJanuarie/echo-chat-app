import '../styles/Signin.css';
import '../styles/FormCard.css';
import React, { useState } from 'react';
import Input from '../components/Input';
import FormCard from '../components/FormCard';
import Button from '../components/Button';
import Avatar from '../components/chatPageComponents/Avatar';
import EditAvatar from '../components/chatPageComponents/EditAvatar';
import ArrowButton from '../components/ArrowButton';
import PopUp from '../components/PopUp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const UserProfile = () =>{
    const [flname, setFlname] = useState('');
    const [bio, setBio] = useState('');
    const [pic, setPic] = useState('');

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
    const submitHandler = async (e) =>{
        e.preventDefault();

        if (!bio || !flname) {
            showPopUpMessage('Please fill in all the fields!', 'yellow', 'absolute');
            return;
        }

        console.log(bio, flname);

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            
            const local_email = localStorage.getItem("userEmail");
            const { data } = await axios.put(
                
                `https://echo-chat-app-bk.onrender.com/api/user/${local_email}`, // Update this URL as needed
                {
                    bio,
                    flname,
                    pic,
                },
                config
            );
            
            
            showPopUpMessage('Profile Created Successful', 'green');
            console.log(data);

            // Clears form
            setFlname('');
            setBio('');
            localStorage.setItem("updatedUserInfo", JSON.stringify(data));
            navigate("/chat");
        } catch (error) {
            console.error("Error details:", error.response ? error.response.data : error.message);
            showPopUpMessage('Error Occurred: ' + (error.response ? error.response.data.message : error.message), 'red');
        }
    };

    // function for posting Image
    const postDetails = (pics) => {
        if (pics === undefined) {
            showPopUpMessage('Please select an Image!', 'yellow');
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
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
            showPopUpMessage('Please Select an Image!', 'yellow');
        }
    };

    return(
        <div>
            {showPopUp && <PopUp content={popUpContent} color={'black'} backgroundColor={popUpColor} position={popUpPosition}/>}
            <FormCard backgroundColor={'transparent'} border={'2px solid black'} contentWidth={'20%'}
                    innerCard={{
                        backgroundColor:'white'
                    }}
                >

                {/* Adding arrow button */}
                <ArrowButton linkComp={'/signup'}/>

                <form onSubmit={submitHandler}>
                <EditAvatar src={pic || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'} alt={'Default avatar image'}
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
                        onChange: (e) =>setFlname(e.target.value),
                        value: flname,
                        backgroundColor: 'white', 
                        border: '2px solid black',
                        marginTop: '0px',
                        marginBottom: '20px',
                        color: 'black'
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
                        marginBottom: '20px',
                        color: 'black'
                    }}
                />

       <Button type={'submit'} backgroundColor={'black'} width={'100%'} color={'white'} content={'Create Profile'}
        />
                </form>
            </FormCard>
        </div>
    );

     };
export default UserProfile;