import '../../styles/Avatar.css';
import { ChatState } from '../../Context/ChatProvider';

function Avatar(props) {
    const { user } = ChatState();
    return (
        <div className='image-container'>
            <img className='image'
                src={user?.pic || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'} 
                alt="Avatar" 
            />
        </div>
    );
}

export default Avatar;