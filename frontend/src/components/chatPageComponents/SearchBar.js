import '../../App.css';
import '../../styles/SearchBar.css';
import React, { useEffect, useRef } from 'react';

function SearchBar(props) {
    const searchBarRef = useRef(null);
    const inputRef = useRef(null); 
    const inputStyle = {
        backgroundColor: props.backgroundColor,
        top: props.top,
        border: props.border,
        margin: props.margin,
        position: props.position
    };

    const borderFunction = {
        changeBorderColor: () => {
            if (searchBarRef.current) {
                searchBarRef.current.style.borderBottom = '1px solid #b38867'; 
            }
        },
        resetBorderColor: () => {
            if (searchBarRef.current) {
                searchBarRef.current.style.borderBottom = '1px solid #343434';
            }
        }
    };

    useEffect(() => {
        const inputElement = inputRef.current;

        if (inputElement) {
            inputElement.addEventListener('click', borderFunction.changeBorderColor);
            inputElement.addEventListener('blur', borderFunction.resetBorderColor);
        }

        // Cleanup function to remove event listeners
        return () => {
            if (inputElement) {
                inputElement.removeEventListener('click', borderFunction.changeBorderColor);
                inputElement.removeEventListener('blur', borderFunction.resetBorderColor);
            }
        };
    }, []);

    return (
        <div className="search-bar" style={inputStyle} ref={searchBarRef} >
            <i className="fa-solid fa-magnifying-glass search-icon" style={{ color: 'white', marginLeft: '10px' }}></i>
            <input type="text" placeholder={props.placeholder} style={{ backgroundColor: '#202020' }} ref={inputRef} />
        </div>
    );
}

export default SearchBar;