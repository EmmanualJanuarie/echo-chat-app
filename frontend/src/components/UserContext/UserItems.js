import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import Card from "../chatPageComponents/Card";
import Columns from "../Columns";
import Column from "../Column";
import Heading from "../chatPageComponents/Heading";
import '../../styles/UserItems.css';

const UserItems = ({user, handleFunction}) =>{
  return (
    <div className="usercards">
        <Card
                onClick={handleFunction}
                cursor={"pointer"}
                backgroundColor={"#E8E8E8"}
                marginBottom={'20px'}
            >
            <Columns gap={'3%'} position={'relative'}>
                {/* Image */}
                <Column>
                <img className="add-cursor avatar-size"
                src={user.pic} 
                alt="default-Account-image" 
                style={{
                    position: 'absolute', // Change to relative or remove
                    right: '160px',
                    top: '-8px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    border: '2px solid black'
                }}
                />
                </Column>
                <Heading content={user.flname} fontSize={'15px'} color={'gray'} fontWeight={'bold'}
                    position={'absolute'} textAlign={'left'}  bottom={'12px'} left={'80px'}
                />

                <Heading content={user.email} fontSize={'14px'} color={'gray'}
                position={'absolute'} textAlign={'left'}  bottom={'-10px'} left={'80px'}
                />

                </Columns>
        </Card>
    </div>
  );
};

export default UserItems;