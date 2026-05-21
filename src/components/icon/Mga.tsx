import React from 'react';

export const Mga = () => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      width="34px" 
      height="34px" 
      fill="none" 
      stroke="currentColor"
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      
    >
      {/* Le tracé géométrique du M et du A entrelacés */}
      <path d="M 25 75 L 45 25 L 55 50 L 65 25 L 75 55" />
      <path d="M 33 55 L 67 55" />
      <circle cx="50" cy="50" r="45" strokeWidth="2" strokeDasharray="5 5" opacity="0.3" />
    </svg>
  );
};