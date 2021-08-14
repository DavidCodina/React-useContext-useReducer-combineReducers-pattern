import { INCREMENT_COUNT, DECREMENT_COUNT } from '../action-types';


const incrementCount = (value) => {
  return { type: INCREMENT_COUNT, payload: { value: value }  };
};


const decrementCount = (value) => {
  return { type: DECREMENT_COUNT, payload: { value: value } };
};


// Export an object of all action creators. They will then get merged 
// into a single actionCreators object in the local index.js
export const countActions = {
  incrementCount,
  decrementCount
};
