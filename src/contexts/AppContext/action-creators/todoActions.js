import { 
  GET_TODOS,
  SET_TODOS_LOADING,
  SET_TODOS_ERROR,
  GET_TODO,
  SET_TODO_LOADING,
  SET_TODO_ERROR
} from '../action-types';


import { getData } from '../../../helpers/axios-helper';


/* =============================================================================

============================================================================= */
////////////////////////////////////////////////////////////////////////////////
//
//  For action creators that return a function and not an actual action object,
//  a useReducerWithMiddleware hook has been created, that has thunk-like feature.
//  Redux Thunk allows the action creator function to return a function
//
////////////////////////////////////////////////////////////////////////////////


const getTodos = () => async (dispatch /*, state */) => {
  dispatch({ type: SET_TODOS_ERROR,   payload: null });
  dispatch({ type: SET_TODOS_LOADING, payload: true });

  try {
    const res = await getData('https://jsonplaceholder.typicode.com/todos?_limit=10');
    await new Promise(resolve => setTimeout(resolve, 1000)); //! Demo only : simulate a slow request.

    // In Learn the MERN we create action creators for these. See above.
    dispatch({ type: GET_TODOS,         payload: res.data });
    dispatch({ type: SET_TODOS_LOADING, payload: false });
    
  } catch(err){
    console.error(err);
    dispatch({ type: SET_TODOS_ERROR,   payload: err });
    dispatch({ type: SET_TODOS_LOADING, payload: false });
  }
};


/* =============================================================================

============================================================================= */


const getTodo = (id) => async (dispatch) => {
  dispatch({ type: SET_TODO_ERROR,   payload: null });
  dispatch({ type: SET_TODO_LOADING, payload: true });

  try {
    const res = await getData(`https://jsonplaceholder.typicode.com/todos/${id}`); 
    // await new Promise(resolve => setTimeout(resolve, 1000)); //! Demo only : simulate a slow request.

    dispatch({ type: GET_TODO,         payload: res.data });
    dispatch({ type: SET_TODO_LOADING, payload: false });
    
  } catch(err){
    dispatch({ type: SET_TODO_ERROR,   payload: err });
    dispatch({ type: SET_TODO_LOADING, payload: false });
  }
};


// Export an object of all action creators. They will then get merged 
// into a single actionCreators object in the local index.js
export const todoActions = { getTodos, getTodo };
