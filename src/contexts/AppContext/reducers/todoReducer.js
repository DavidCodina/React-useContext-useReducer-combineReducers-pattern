import { 
  GET_TODOS,
  SET_TODOS_LOADING,
  SET_TODOS_ERROR,
  GET_TODO,
  SET_TODO_LOADING,
  SET_TODO_ERROR
} from '../action-types';


const initialState = {
  todosLoading: false,
  todos: [],  
  todosError: null,

  todoLoading: false,
  todo: null,
  todoError: null
};


export default function todoReducer(state = initialState, action){
  switch(action.type) {
    case SET_TODOS_LOADING:
      return {
        ...state,
        todosLoading: action.payload
      };

    case GET_TODOS:
      return {
        ...state,
        todos: action.payload
      };

    case SET_TODOS_ERROR:
      return {
        ...state,
        todosError: action.payload
      };

    case SET_TODO_LOADING:
      return {
        ...state,
        todoLoading: action.payload
      };

    case GET_TODO:
      return {
        ...state,
        todo: action.payload
      };

    case SET_TODO_ERROR:
      return {
        ...state,
        todoError: action.payload
      };

    default: return state;
  }
}
