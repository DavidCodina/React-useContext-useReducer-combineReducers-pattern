import React             from 'react';
import { useAppContext } from '../../contexts/AppContext';


/* ==================================================================

================================================================== */


export const RandomNumberGenerator = () => {
  const { state: { randomNumberState }, randomizeNumber } = useAppContext();
  const { randomNumber } = randomNumberState;


  return (
    <div
      className="mx-auto mb-5 p-3 bg-light border border-2 border-blue rounded-3 shadow-sm"
      style={{ maxWidth: 250 }}
    >
      <div 
        className="mb-3 font-montserrat text-blue text-center" 
        style={{ fontSize: 32, lineHeight: 1 }}
      >{ randomNumber }</div>

      <button 
        className="d-block mx-auto btn btn-outline-blue font-montserrat" 
        
        onClick={randomizeNumber}
      >Random Number</button>
    </div>
  );
};

