import React, { useState } from 'react';
import SignUp from '../pages/signup'; // Adjust the path as necessary
import UserProfile from '../pages/UserProfile'; // Adjust the path as necessary

const UserSetup = () => {
    return (
        <div>
            <SignUp 
                setEmail={setEmail} 
                setPassword={setPassword} 
                setConfirmPwd={setConfirmPwd} 
            />
            <UserProfile 
                email={email} 
                password={password} 
                confirmPwd={confirmPwd} 
            />
        </div>
    );
};

export default UserSetup;