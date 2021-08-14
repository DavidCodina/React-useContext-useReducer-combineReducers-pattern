/* eslint-disable */

// This file includes most of redux.js, with the exception of createStore, and a
// a few other functions. The two primary functions below are combineReducers, and
// bindActionCreators. The rest of the functions play a supporting role.


/* =============================================================================
                        
============================================================================= */
// Used within miniKindOf()


function ctorName(val) {
  return typeof val.constructor === 'function' ? val.constructor.name : null;
}


/* =============================================================================
                        
============================================================================= */
// Used within miniKindOf()


function isError(val) {
  return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
}


/* =============================================================================
                        
============================================================================= */
// Used within miniKindOf()


function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
}


/* =============================================================================
                        
============================================================================= */
// Used within getUnexpectedStateShapeWarningMessage()



// Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of
function miniKindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';
  var type = typeof val;

  switch (type) {
    case 'boolean':
    case 'string':
    case 'number':
    case 'symbol':
    case 'function':
      {
        return type;
      }
  }

  if (Array.isArray(val)) return 'array';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  var constructorName = ctorName(val);

  switch (constructorName) {
    case 'Symbol':
    case 'Promise':
    case 'WeakMap':
    case 'WeakSet':
    case 'Map':
    case 'Set':
      return constructorName;
  } // other

  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
}


function kindOf(val){
  var typeOfVal = typeof val;
  { typeOfVal = miniKindOf(val); }
  return typeOfVal;
}


/* =============================================================================
                        
============================================================================= */
// Used inside of getUnexpectedStateShapeWarningMessage()


function isPlainObject(obj){
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;


  while (Object.getPrototypeOf(proto) !== null){
    proto = Object.getPrototypeOf(proto);
  }


  return Object.getPrototypeOf(obj) === proto;
}


/* =============================================================================
                        
============================================================================= */
// ActionTypes is used by assertReducerShape(), and getUnexpectedStateShapeWarningMessage().
// These are private action types reserved by Redux.
// For any unknown actions, you must return the current state.
// If the current state is undefined, you must return the initial state.
// Do not reference these action types directly in your code.


var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};


var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION(){
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};


/* =============================================================================
                        
============================================================================= */


function warning(message){
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty
}


/* =============================================================================
                        
============================================================================= */
// assertReducerShape() is used by combineReducers().
// Internally, it uses ActionTypes.INIT, and ActionTypes.PROBE_UNKNOWN_ACTION()
// This function checks that each reducer has initialState, and returns state
// even when the action type fails to meet a case (i.e., has a switch default case)


function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function(key){
    var reducer      = reducers[key];
    var initialState = reducer(undefined, { type: ActionTypes.INIT });

    //# Can test by setting state = undefined in some reducer.
    if (typeof initialState === 'undefined') {
      throw new Error("The slice reducer for key \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    //# Can test by failing to provide a default switch case in some reducer.
    if (typeof reducer(undefined, { type: ActionTypes.PROBE_UNKNOWN_ACTION() }) === 'undefined') {
      throw new Error("The slice reducer for key \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle '" + ActionTypes.INIT + "' or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}


/* =============================================================================
                        
============================================================================= */
// getUnexpectedStateShapeWarningMessage() is used by combineReducers().
// Internally, it uses ActionTypes.INIT, ActionTypes.REPLACE


function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache){
  var reducerKeys  = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';


  if (reducerKeys.length === 0){
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }


  if (!isPlainObject(inputState)){
    return "The " + argumentName + " has unexpected type of \"" + kindOf(inputState) + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }


  var unexpectedKeys = Object.keys(inputState).filter(function(key){
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });


  unexpectedKeys.forEach(function(key){ unexpectedKeyCache[key] = true; });


  if (action && action.type === ActionTypes.REPLACE){ return; } 


  if (unexpectedKeys.length > 0){
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}


/* =============================================================================
                        
============================================================================= */
//  This is the combineReducers from Redux.
//  Internally it uses:
//
//    warning()
//    assertReducerShape()
//    getUnexpectedStateShapeWarningMessage()


export function combineReducers(reducers){
  var reducerKeys   = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    { //# Can test by passing in undefined instead of reducer for a given key.
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    //# Make sure reducer is a function before adding it to finalReducers.
    if (typeof reducers[key] === 'function'){
      finalReducers[key] = reducers[key];
    } 
    // else { console.log(`${key} is not a function!`); }
  }

  // This is used to make sure we don't warn about the same keys multiple times.
  var finalReducerKeys = Object.keys(finalReducers); 

  var unexpectedKeyCache;

  { unexpectedKeyCache = {}; }

  var shapeAssertionError;

  try {
    //# call assertReducerShape() and catch error.
    assertReducerShape(finalReducers);
  } catch(e){
    // console.log('Error thrown by assertReducerShape() : ', e); 
    //# Assign error to shapeAssertionError.
    shapeAssertionError = e;
  }

  return function combination(state, action){
    if (state === void 0){ state = {}; }


    //# rethrow error if shapeAssertion 
    if (shapeAssertionError){ throw shapeAssertionError; }


    {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage){ warning(warningMessage); }
    }


    var hasChanged = false;
    var nextState  = {};


    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key                = finalReducerKeys[_i];
      var reducer             = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey     = reducer(previousStateForKey, action);


      if (typeof nextStateForKey === 'undefined') {
        var actionType = action && action.type;
        //# Throw error if some reducer case returns undefined.
        //# For example: case INCREMENT_COUNT: return; 
        throw new Error("When called with an action of type " + (actionType ? "\"" + String(actionType) + "\"" : '(unknown type)') + ", the slice reducer for key \"" + _key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.");
      }


      nextState[_key] = nextStateForKey;
      hasChanged      = hasChanged || nextStateForKey !== previousStateForKey;
    }

    //# If the state hasChanged then return nextState.
    //# Otherwise just return the same state.
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}


/* =============================================================================
                        
============================================================================= */
// Interesting that Redux uses arguments: 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
// I thought it was strongly discouraged.


function bindActionCreator(actionCreator, dispatch){
  return function(){
    return dispatch(actionCreator.apply(this, arguments));
  };
}


/* =============================================================================
                        
============================================================================= */
// Turns an object whose values are action creators, into an object with the
// same keys, but with every function wrapped into a `dispatch` call so they
// may be invoked directly. 


export function bindActionCreators(actionCreators, dispatch){
  if (typeof actionCreators === 'function'){
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, but instead received: '" + kindOf(actionCreators) + "'. " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var boundActionCreators = {};

  for (var key in actionCreators){
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function'){
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}
