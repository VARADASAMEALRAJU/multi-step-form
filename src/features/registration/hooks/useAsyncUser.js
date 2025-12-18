import { useState } from 'react';

export const useAsyncUser = () => {
  const [isChecking, setIsChecking] = useState(false);

  const checkUsername = async (username) => {
    setIsChecking(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsChecking(false);
    
    // Simulate that "admin" is already taken
    if (username.toLowerCase() === 'admin') {
      return false;
    }
    return true;
  };

  return { checkUsername, isChecking };
};