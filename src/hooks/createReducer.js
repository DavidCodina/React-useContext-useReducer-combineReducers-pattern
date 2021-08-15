import { useCallback, useRef, useState, useEffect } from 'react';


function useFirstMountState(){
  const isFirst = useRef(true);
  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }
  return isFirst.current;
}


/* =============================================================================

============================================================================= */


const useUpdateEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState();
  useEffect(() => {
    if (!isFirstMount){ return effect(); }
  }, deps); // eslint-disable-line
};


/* =============================================================================

============================================================================= */


function composeMiddleware(chain){
  return (context, dispatch) => {
    return chain.reduceRight((res, middleware) => {
      return middleware(context)(res);
    }, dispatch);
  };
}


const createReducer = (...middlewares) => {
  // Returns the inner function with the middlewares array in scope.
  const composedMiddleware = composeMiddleware(middlewares);

  // createReducer returns a useReducer hook.
  return (reducer, initialState, initializer = (value) => value) => {
    const ref          = useRef(initializer(initialState));
    const [, setState] = useState(ref.current);


    const dispatch = useCallback((action) => {
      ref.current = reducer(ref.current, action);
      setState(ref.current);
      return action;
    }, [reducer]);


    const dispatchRef = useRef(composedMiddleware({
      getState: () => ref.current,
      dispatch: (...args) => dispatchRef.current(...args),
    }, dispatch));


    useUpdateEffect(() => {
      dispatchRef.current = composedMiddleware({
        getState: () => ref.current,
        dispatch: (...args) => dispatchRef.current(...args),
      }, dispatch);
    }, [dispatch]);


    return [ref.current, dispatchRef.current];
  };
};



export default createReducer;