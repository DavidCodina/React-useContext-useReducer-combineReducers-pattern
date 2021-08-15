import { useReducer, useEffect, useRef } from 'react';


/* =============================================================================
                        
============================================================================= */


// https://www.robinwieruch.de/react-usereducer-middleware
// React's useReducer does not support middleware, so we must create a custom hook:
export const useReducerWithMiddleware = (reducer, initialState, middlewareFns, afterwareFns) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const aRef              = useRef(); // i.e, as in actionRef
 

  // This is an enhanced dispatch. The dispatch take in an action as normal.
  // For example: dispatch({ type: ..., payload: ... });
  function dispatchWithMiddleware(action){
    // Call middlewares.
    middlewareFns.forEach(middlewareFn => { middlewareFn(action, state); });
    aRef.current = action;


    // This is the thunk part: https://github.com/streamich/react-use/issues/164
    // However, if the action is a function, then execute it: action(dispatch, state);
    if (typeof action === 'function'){ 
      // Originally this was: action(dispatch, state), but by making it recursive we
      // can run also run the middlware on dispatch calls that are inside of the the
      // function. For example: () => async (dispatch, state) => { ...internal dispatch calls }
      action(dispatchWithMiddleware, state); 
    } else {
      dispatch(action); 
    }
  }

  
  // This ends up running EVERY time state changes,
  // but that's actually what we want to happen.
  useEffect(() => {
    if (!aRef.current){ return; } 

    // Otherwise, call any afterware.
    afterwareFns.forEach(afterwareFn => afterwareFn(aRef.current, state));
    aRef.current = null;
  }, [afterwareFns, state]);
  return [state, dispatchWithMiddleware];
};


////////////////////////////////////////////////////////////////////////////////////////////////
//
// Usage:
//
// const loggerBefore = (action, state) => { 
//   if (typeof action === 'function'){
//     console.log("\naction: Fn"); // I didn't want to see the whole function. 
//   } else {
//     console.log("\naction:", action); 
//   }
//   console.log("state is now:", state);
// }; 
//
// const loggerAfter = (action, state) => { // eslint-disable-line
//   console.log("\naction:", action); 
//   console.log("state is now:", state);
// }; 
//
//
// const [ state, dispatch ] = useReducerWithMiddleware(rootReducer, initialState, [loggerBefore], []);
//
//
//  This approach worked well enough, but I wanted to have something that was compatible 
//  with redux middleware. Figuring out that part was a little tricky. Ultimately, I went with
//  createReducer from react-use: https://github.com/streamich/react-use. 
//
//  It mimick the way Redux handles middleware. This means that the above middleware will no longer
//  be compatible. Middleware must look like this:
//
//    const someFunction = (store) => (next) => (action) => {}
//
//
//  So... This hook is not actually being used, but it was good practice
//
////////////////////////////////////////////////////////////////////////////////////////////////