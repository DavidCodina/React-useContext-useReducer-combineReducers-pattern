import { RANDOMIZE_NUMBER } from '../action-types';


const randomizeNumber = () => {
  return { type: RANDOMIZE_NUMBER };
};


// Export an object of all action creators. They will then get merged 
// into a single actionCreators object in the local index.js
export const randomNumberActions = { randomizeNumber };
