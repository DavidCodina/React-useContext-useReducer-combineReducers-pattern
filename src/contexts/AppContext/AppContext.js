import React, { createContext, useContext } from 'react';
import { actionCreators }                   from './action-creators';
import { rootReducer }                      from './reducers';
import { bindActionCreators }               from '../redux-helpers';
import createReducer                        from '../../hooks/createReducer';


////////////////////////////////////////////////////////////////////////////////
//
//  In order to initialize the default values of each of the separate reducers, 
//  we can run the reducer once outside of the the component.
//  Conversely, you could also do this: 
//  const [ state, dispatch ] = useReducer(rootReducer, null, () => rootReducer({}, { type: "RUN_ROOT_REDUCER" })); 
//  Or even this seems to work
//  const [ state, dispatch ] = useReducer(rootReducer, rootReducer({}, { type: "RUN_ROOT_REDUCER" })); 
//
////////////////////////////////////////////////////////////////////////////////
const initialState = rootReducer({}, { type: "RUN_ROOT_REDUCER_TO_INITIALIZE_DEFAULT_STATE_OF_EACH_REDUCER" });


////////////////////////////////////////////////////////////////////////////////
//
//  Initially, a custom bindActionCreators() function was created here:
//
//      const bindActionCreators = (actionCreators, dispatch) => {
//        const keys                = Object.keys(actionCreators);
//        const boundActionCreators = {};
//        for (let i = 0; i < keys.length; i++){
//          const key = keys[i];
//          boundActionCreators[key] = (...args) => dispatch(actionCreators[key](...args));
//        }
//        return boundActionCreators;
//      };
//
//
//  It worked just fine, but as with the custom combineReducers() function, 
//  Redux does it better, so the Redux version is being used instead.
//
////////////////////////////////////////////////////////////////////////////////


/* =============================================================================
                              Optional Middleware                
============================================================================= */


function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
}


const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;


const logger = ({ getState, dispatch }) => next => action => { // eslint-disable-line
  console.log('previous state: ', getState());
  console.log('dispatching',    action);
  ////////////////////////////////////////////////////////////////////////////////
  //
  //  Always call next(action), and always return it.
  //  The return is so redux (or in this case createReducer) knows you're done executing
  //
  //  return next(action);
  //
  //  Once we call next, we know that the state has been updated, so we can do 
  // this kind of thing to log the after state:
  //
  ////////////////////////////////////////////////////////////////////////////////
  const result = next(action);
  console.log('next state: ', getState());
  return result;
};


/* =============================================================================
                        
============================================================================= */


const useCustomReducer   = createReducer(thunk/*, logger*/);
export const AppContext  = createContext({});
export const AppConsumer = AppContext.Consumer;


export function AppProvider({ children }){
  ////////////////////////////////////////////////////////////////////////////////////////////////
  //
  //  Custom Reuducer:
  //
  //  Using: const [ state, dispatch ] = useReducer(rootReducer, initialState);
  //  would be fine, except we want to implement middleware.
  //
  //  Initially, a custom useReducerWithMiddleware hook was created with a thunk-like feature built-in.
  //  It worked well, but was not compatible with standard redux middleware. I attempted to
  //  refactor it, but it got really tricky, so instead I went with the createReducer factory
  //  function from react-use: https://github.com/streamich/react-use. It has been copied and pasted into src, rather
  //  than installing it with npm. This was because I wanted to see what it was doing.
  //  However, in the future I would just install react-use, and not worry about it.
  //
  //  createReducer works in such a way that any middleware that you create will receive a first
  //  argument of { getState, dispatch } -like Redux! If not destructed you would usually name it store in Redux. 
  //  If you need to pass an extra argument to your middleware, follow the pattern that redux-thunk does.
  //
  //  Because createReducer mimicks Redux, we MUST use middleware that also conforms to 
  //  the expected pattern:
  //
  //    const someFunction = (store) => (next) => (action) => {
  //      // Do stuff...
  //      return next(action);
  //    };
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////
  const [state, dispatch] = useCustomReducer(rootReducer, initialState);


  const boundActionCreators = bindActionCreators(actionCreators, dispatch);
  // Because we're binding the actionCreators here and spreading them 
  // into value, there's really no need to expose dispatch.
  const value = { state, ...boundActionCreators };


  // Can also do <AppContext.Provider value={value} {...props} />, 
  // but it's less clear that you're passing children.
  return (
    <AppContext.Provider value={value}>
      { children }
    </AppContext.Provider>
  );
}


export function useAppContext(){
  return useContext(AppContext);
}