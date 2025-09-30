// Placeholder export for @recipe-wire/ui
// This package will contain shared UI components

import React from 'react';

// Example placeholder component - will be expanded with actual components in later stories
export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  [key: string]: any;
}> = ({ children, onClick, variant = 'primary', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded font-medium';
  const variantClasses = 
    variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : 
    'bg-gray-200 text-gray-800 hover:bg-gray-300';
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Additional UI components will be added in later stories based on requirements
