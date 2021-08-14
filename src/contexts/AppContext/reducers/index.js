import countReducer        from './countReducer';
import randomNumberReducer from './randomNumberReducer';


/* =============================================================================
                        
============================================================================= */
////////////////////////////////////////////////////////////////////////////////
//
//  Initially I was using the combineReducers from: 
//  https://codezup.com/how-to-combine-multiple-reducers-in-react-hooks-usereducer/
//  But it wasn't working correctly. This works much better
//  https://stackoverflow.com/questions/59200785/react-usereducer-how-to-combine-multiple-reducers
//
//      const combineReducers = (slices) => (state, action) =>
//        Object.keys(slices).reduce( // use for..in loop, if you prefer it
//          (acc, prop) => ({
//            ...acc,
//            [prop]: slices[prop](acc[prop], action),
//          }),
//          state
//        );
//
//
//  The combineReducers below is the same as above, but a bit easier to read.
//  This version works great, but it would be interesting to try to extract the
//  redux version and implement it instead. 
//
////////////////////////////////////////////////////////////////////////////////


const combineReducers = (slices) => {
  return (
    function rootReducer(state, action){
      return Object.keys(slices).reduce(
        (acc, prop) => {
          return {
            ...acc,
            [prop]: slices[prop](acc[prop], action),
          }
        },
        state
      );
    }
  );
};
  

// By convention, some would name the properties count and randomNumber,
// but that's not actually what they represent. They represent slices of
// state, and so 'State' is appended to the end of each property.
export const rootReducer = combineReducers({
  countState:        countReducer,
  randomNumberState: randomNumberReducer
});