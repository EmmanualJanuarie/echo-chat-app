import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import Card from "../chatPageComponents/Card";
import Columns from "../Columns";
import Column from "../Column";
import Heading from "../chatPageComponents/Heading";
import '../../styles/UserItems.css';

const UserItems = ({user, handleFunction}) =>{
  return (
    <div className="usercards" id="userCards">
        <Card
                onClick={handleFunction}
                cursor={"pointer"}
                backgroundColor={"lightGray"}
                marginBottom={'20px'}
            >
            <Columns  position={'relative'} display={'flex'}>
                {/* Image */}
                <Column>
                <img className="add-cursor avatar-size"
                src={`${user.pic}`} 
                alt="Account-image" 
                style={{
                    position: 'absolute', // Change to relative or remove
                    right: '190px',
                    // top: -8px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    border: '2px solid black'
                }}
                />
                </Column>

                <Column>
                  <div style={{textAlign: 'right'}}> 
                  <Heading content={user.flname} fontSize={'15px'} color={'gray'} fontWeight={'bold'}
                      textAlign={'left'}  
                  />
                  <Heading content={user.email} fontSize={'14px'} color={'gray'} fontWeight={'400'}
                      textAlign={'right'}
                  />
                  </div>
                </Column>
                </Columns>
        </Card>
    </div>
  );
};

export default UserItems;