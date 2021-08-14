import { countActions }        from './countActions';
import { randomNumberActions } from './randomNumberActions';

// All action creators are spread into a single object, 
// this object is then passed into the bindActionCreators helper within AppContext file.
export const actionCreators = {
  ...countActions,
  ...randomNumberActions
};