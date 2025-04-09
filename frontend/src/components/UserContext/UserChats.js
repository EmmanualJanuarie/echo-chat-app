import React from "react";
import { ChatState } from "../../Context/ChatProvider.js";
import Card from "../chatPageComponents/Card.js";
import Columns from "../Columns.js";
import Column from "../Column.js";
import Heading from "../chatPageComponents/Heading.js";
import '../../styles/UserItems.css';
import PopUp from "../PopUp.js";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


const UserChats = ({ handleFunction }) =>{
    const [searchResult, setSearchResult] = useState([]);
    const [searchActive, setSearchActive] = useState(false);
    
    const [popUpContent, setPopUpContent] = useState('');
    const [popUpPosition, setPopUpPosition] = useState('');
    const [popUpColor, setPopUpColor] = useState('');
    const [showPopUp, setShowPopUp] = useState(false);

    const showPopUpMessage = (content, color, position) => {
        setPopUpContent(content);
        setPopUpColor(color);
        setPopUpPosition(position);
        setShowPopUp(true);
        setTimeout(() => setShowPopUp(false), 4000); // Hide after 3 seconds
    };


  return (
    <div className="usercards" id="userCards">
        {showPopUp && <PopUp content={popUpContent} color={'black'} backgroundColor={popUpColor} position={popUpPosition}/>}
        <Card
                onClick={handleFunction}
                cursor={"pointer"}
                marginBottom={'20px'}
            >
            <Columns  position={'relative'} display={'flex'}>
                <Column>
                  {/* {props.children} */}
                </Column>
                </Columns>
        </Card>
    </div>
  );
};

export default UserChats;