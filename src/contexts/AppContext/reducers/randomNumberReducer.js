import { RANDOMIZE_NUMBER } from '../action-types';


const initialState = {
  randomNumber: 0
};


const randomNumberReducer = (state = initialState, action = {}) => {
  switch (action.type){
    case RANDOMIZE_NUMBER : {
      return {
        ...state,
        // Initially, I called it value, but that's a bad idea because 
        // 'value' is often meant to indicate the context value.
        randomNumber: Math.round(Math.random()*100) 
      }
    }

    default: return state
  }
}


export default randomNumberReducer;