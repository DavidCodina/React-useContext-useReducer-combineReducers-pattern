import React from 'react';


export const Navicon2 = ({ toggleCollapse }) => { 
  return (
    <button
      id="custom-toggler"
      className="navbar-toggler custom-toggler"
      type="button"   
      onClick={toggleCollapse}
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  );
}