import React, {useState} from "react";
const SearchSection = (props) =>{
    const searchSectionStyling = {
        backgroundColor: props.backgroundColor
    }

    return <div>
    {props.children}
        </div>;
};

export default SearchSection;