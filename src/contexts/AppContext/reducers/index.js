import { combineReducers } from '../../redux-helpers';
import countReducer        from './countReducer';
import randomNumberReducer from './randomNumberReducer';
import todoReducer         from './todoReducer';


////////////////////////////////////////////////////////////////////////////////
//
//  The benefit of using the Redux combineReducers function as opposed to a 
//  custom one is that Redux combineReducers has better error handling.
//  It will also ignore any properties that are not functions.
//
//  Initially, I was using a custom combineReducers function. It worked great, but 
//  was less sophisticated:
//
//
//      https://stackoverflow.com/questions/59200785/react-usereducer-how-to-combine-multiple-reducers
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
//
//      const combineReducers = (slices) => {
//        return (
//          function rootReducer(state, action){
//            return Object.keys(slices).reduce(
//              (acc, prop) => {
//                return {
//                  ...acc,
//                  [prop]: slices[prop](acc[prop], action),
//                }
//              },
//              state
//            );
//          }
//        );
//      };
//
////////////////////////////////////////////////////////////////////////////////


// By convention, some would name the properties count and randomNumber,
// but that's not actually what they represent. They represent slices of
// state, and so 'State' is appended to the end of each property.
export const rootReducer = combineReducers({
  countState:        countReducer,
  randomNumberState: randomNumberReducer,
  todoState:         todoReducer
});