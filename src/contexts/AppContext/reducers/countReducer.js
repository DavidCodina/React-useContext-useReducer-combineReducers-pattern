import { INCREMENT_COUNT, DECREMENT_COUNT } from '../action-types';


const initialState = {
  count: 0, 
};


const countReducer = (state = initialState, action = {}) => {
  switch (action.type){ 
    
    case INCREMENT_COUNT: return { ...state, count: state.count + action.payload.value };
    case DECREMENT_COUNT: return { ...state, count: state.count - action.payload.value };
    default:              return state;
  }
};


export default countReducer;




