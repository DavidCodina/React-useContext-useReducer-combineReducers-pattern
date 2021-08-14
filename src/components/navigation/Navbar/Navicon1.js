import React from 'react';


export const Navicon1 = ({ show, toggleCollapse }) => { 
  return (
    <button
      onClick={toggleCollapse} 
      className={`btn hamburger-container hamburger-squeeze align-self-center user-select-none${show ? ' active' : ''}`}
    >
      <div className="hamburger-inner"></div>
    </button>
  );
};
