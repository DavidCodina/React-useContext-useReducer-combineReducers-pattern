import React, { createContext, useReducer, useContext } from 'react';
import { actionCreators }                               from './action-creators';
import { rootReducer }                                  from './reducers';
import { bindActionCreators }                           from '../redux-helpers';


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
//  Initially, a custom bindActionCreators() function was used here:
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


export const AppContext  = createContext({});
export const AppConsumer = AppContext.Consumer;


/* =============================================================================
                        
============================================================================= */


export function AppProvider({ children }){
  const [ state, dispatch ] = useReducer(rootReducer, initialState);
  const boundActionCreators = bindActionCreators(actionCreators, dispatch);
  // Because we're binding the actionCreators here and spreading them 
  // into value, there's really no need to expose dispatch.
  const value = { state/*, dispatch*/, ...boundActionCreators };


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