import React from 'react';

export const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyles = "px-6 py-2 rounded-md font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50 focus:ring-gray-400"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};