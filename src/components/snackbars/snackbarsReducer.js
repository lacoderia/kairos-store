import { fromJS, List } from 'immutable';
import {
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  EXIT_SNACKBAR,
} from 'src/actions';

const initialState = fromJS({
  snackbars: List(),
});

function snackbarsReducer(state = initialState, action) {
  switch(action.type){
    case OPEN_SNACKBAR:
      return state.merge({
        snackbars: state.get('snackbars').push(fromJS(action.payload)),
      })
    case CLOSE_SNACKBAR:
      return state.merge({
        snackbars: state.get('snackbars').setIn([0, 'open'], false),
      })
    case EXIT_SNACKBAR:
      return state.merge({
        snackbars: state.get('snackbars').shift(),
      })
    default:
      return state;
  }
}

export default snackbarsReducer;
