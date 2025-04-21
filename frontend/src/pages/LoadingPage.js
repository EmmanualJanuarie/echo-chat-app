import React, { useState, useEffect } from 'react';
import Signin from './Signin';
import { useNavigate } from 'react-router-dom';
import MainLogo from '../components/MainLogo';

const LoadingPage = () => {
  const [isLoading, setIsLoading] = useState(true); // State to track loading
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Check if the loading has already been shown in this session
    const hasLoaded = sessionStorage.getItem('hasLoaded');

    if (hasLoaded) {
      // If it has been shown, skip the loading screen
      setIsLoading(false);
      navigate('/signin');
    } else {
      // Set a delay of 3 seconds (3000 milliseconds)
      const timer = setTimeout(() => {
        setIsLoading(false); // Set loading to false after 3 seconds
        sessionStorage.setItem('hasLoaded', 'true'); // Set the flag in session storage
        navigate('/signin'); // Navigate to Signin after loading
      }, 3000);

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [navigate]); // Empty dependency array to run only on mount

  return (
    <>
      {isLoading ? (
        <div 
          style={{
            height: '100vh', // Full height for loading screen
            backgroundColor: '#1a2228',
            width: '100%',
            display: 'flex', // Center the content
            justifyContent: 'center', // Center the content
            alignItems: 'center' // Center the content
          }}>
          <div>
            <MainLogo />
          </div>
        </div>
      ) : (
        <Signin /> 
      )}
    </>
  );
};

export default LoadingPage;