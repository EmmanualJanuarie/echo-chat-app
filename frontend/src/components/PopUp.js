import React, { useEffect } from 'react';
import '../styles/ChatAppPage.css';

function PopUp(props) {

    const popUpStyle = {
        backgroundColor: props.backgroundColor,
        textAlign: props.textAlign,
        position: props.position,
        top: props.top,
        color: props.color
    }
    useEffect(() => {
        // Function to handle the deletion of notifications
        const handleDelete = (event) => {
            const $notification = event.target.parentNode;
            if ($notification) {
                $notification.parentNode.removeChild($notification);
            }
        };

        // Add event listeners to delete buttons
        const deleteButtons = document.querySelectorAll('.notification .delete');
        deleteButtons.forEach(($delete) => {
            $delete.addEventListener('click', handleDelete);
        });

        // Clean up event listeners on component unmount
        return () => {
            deleteButtons.forEach(($delete) => {
                $delete.removeEventListener('click', handleDelete);
            });
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

    return (
        <div className='card-justify-center'>
            <div className="notification width-is-20" style={popUpStyle}>
                <button className="delete"></button>
                {props.content}
            </div>
        </div>
    );
}

export default PopUp;