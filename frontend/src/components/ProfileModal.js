import React from "react";
import '../styles/ProfileModal.css';
import { ChatState } from "../Context/ChatProvider";
import Card from "./chatPageComponents/Card";
import Avatar from "./chatPageComponents/Avatar";

const ProfileModal = ({ onClose }) =>{
    const { user } = ChatState();
    return(
        <div className="modal-overlay">
        <div className="modal-content">
            <img
                src={user.pic} 
                alt="default-Account-image" 
                style={{
                    objectFit: 'cover',
                    borderRadius: '50%',
                    border: '2px solid black'
                }}                
            />

           <div  style={{textAlign: 'left'}}>
           <h1 style={{
                   marginBottom: '5px'
            }}>Full Name: <span>{user.flname}</span></h1>

            <h1 style={{
                   marginBottom: '10px'
            }}>Email: <span>{user.email}</span></h1>
           </div>
            <button className="button button-gap" onClick={onClose}>Close</button>
            <button className="button is-danger" >Edit Account</button>

            
        </div>
    </div>
    );
};

export default ProfileModal;