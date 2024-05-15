import React from 'react';

const CircleHelp = ({className, stroke = "currentColor"} : {className?: string; stroke?: string}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className={className}>
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <path d="M12 17h.01"/>
        </svg>
    );
};

export default CircleHelp;