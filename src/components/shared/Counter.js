import React             from 'react';
import { useAppContext } from '../../contexts';

/* ==================================================================

================================================================== */


export const Counter = () => {
  const value = useAppContext();
  const { state, incrementCount, decrementCount } = value;


  return (
    <div 
      className="d-flex justify-content-center align-items-center mx-auto mb-5 p-3 bg-light border border-2 border-blue rounded-3 shadow-sm"
      style={{ maxWidth: 250 }}
    >
      <button 
        className="btn btn-outline-blue font-montserrat"
        style={{ fontSize: 32, lineHeight: 1, minWidth: 50 }} 
        onClick={() => decrementCount(1)}
      >-</button>

      <span 
        className="mx-4 font-montserrat text-blue text-center" 
        style={{ fontSize: 32, lineHeight: 1 }}
      >{ state.countState.count }</span>


      <button 
        className="btn btn-outline-blue font-montserrat"     
        style={{ fontSize: 32, lineHeight: 1, minWidth: 50 }} 
        onClick={() => incrementCount(1)}
      >+</button>
    </div>
  );
};


