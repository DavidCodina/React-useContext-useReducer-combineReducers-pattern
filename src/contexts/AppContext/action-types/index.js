// It's best practice to use constants.
// Also it's not uncommon to keep ALL action types in a single file.
// This way we know for sure that we have not created a duplicate constant.


// Count Action Types
export const INCREMENT_COUNT = 'INCREMENT_COUNT';
export const DECREMENT_COUNT = 'DECREMENT_COUNT';
export const RESET_COUNT     = 'RESET_COUNT';


// Random Number Action Types
// In larger applications it's very important to have highly specific
// actions because when an action is dispatched it goes to ALL reducers!
export const RANDOMIZE_NUMBER = 'RANDOMIZE_NUMBER';

