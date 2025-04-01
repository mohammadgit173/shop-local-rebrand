
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to home page where search is now implemented
    navigate('/', { replace: true });
  }, [navigate]);
  
  return null; // This will never render as we redirect immediately
};

export default SearchPage;
