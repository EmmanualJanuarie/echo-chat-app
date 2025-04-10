import React from "react";
import '../../styles/ProfileModal.css';
import { ChatState } from "../../Context/ChatProvider";
import Card from "../../components/chatPageComponents/Card";
import Avatar from "../../components/chatPageComponents/Avatar";

const UserModal = ({ onClose, selectedUser }) =>{
    const { user } = ChatState();
    return(
        <div className="modal-overlay">
        <div className="modal-content">
            <img
                src={selectedUser.pic} 
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
            }}>Full Name: <span>{selectedUser.flname}</span></h1>

            <h1 style={{
                   marginBottom: '10px'
            }}>Email: <span>{selectedUser.email}</span></h1>
           </div>
            <button className="button button-gap" onClick={onClose}>Close</button>

            
        </div>
    </div>
    );
};

export default UserModal;