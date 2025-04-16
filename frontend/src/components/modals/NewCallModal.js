import '../../styles/NewCallModal.css';
import React, { useRef, useEffect } from 'react';
import SearchBar from '../chatPageComponents/SearchBar';
import Card from '../chatPageComponents/Card';

const NewCallModal = ({onClose}) =>{
    return(
        <div className='modal-wrapper' id='newCalls'>
            <div
            className="card modal-size modal-card-pos callmodal-bg-clr" style={{backgroundColor: '#292929', boxShadow: '0 0 3px 1px rgba(56, 56, 56, 0.5)'}}>
                <div class="card-content">
                    <span className="heading text-left-1">
                        <p>New Calls</p>
                    </span>

                        {/* Search bar component */}
                        <SearchBar
                            backgroundColor={"#202020"}
                            border={"1px solid #343434"}
                            margin={"20px 0 0 0"}
                            placeholder={'Search'}
                        />

                        <div id='buttons'>
                            <button className='button-style button-size' style={{backgroundColor: '#b38867', boxShadow: 'none'}}><i class="fa-solid fa-video"></i></button>
                            <button className='button-style button-size' style={{backgroundColor: '#b38867', boxShadow: 'none'}}><i class="fa-solid fa-phone"></i></button>
                            <button className='cancel-button-style' style={{backgroundColor: '#292929', boxShadow: 'none'}}>Cancel</button>
                        </div>

                        <p className='text-left-1'>All Contacts</p>

                        <div>
                            {/* Show contacts here */}
                        </div>

                        <div className='callcard' id='closeButton'>
                           <span className='close-btn' onClick={onClose}>Close</span>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default NewCallModal;