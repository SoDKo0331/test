
import React, { useState } from 'react';

interface GoldButtonProps {
  text: string;
  onClick?: () => void;
  revealText?: string;
  className?: string;
  fullWidth?: boolean;
}

export const GoldButton: React.FC<GoldButtonProps> = ({ 
  text, 
  onClick, 
  revealText, 
  className = "",
  fullWidth = false 
}) => {
  const [revealed, setRevealed] = useState(false);

  const handleClick = () => {
    if (revealText) {
      setRevealed(true);
      // Optional: hide after a delay or just stay revealed
    }
    if (onClick) onClick();
  };

  return (
    <button 
      onClick={handleClick}
      className={`gold-shimmer px-8 py-4 rounded-full text-sm md:text-base tracking-[0.2em] uppercase shadow-lg transition-transform active:scale-95 ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <span className="relative z-10">
        {revealed && revealText ? revealText : text}
      </span>
    </button>
  );
};
