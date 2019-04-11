import { fromJS } from 'immutable';
import {
  ACCOUNT_UPDATE_FETCH,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_ERROR,
  OPEN_ACCOUNT_DIALOG,
  CLOSE_ACCOUNT_DIALOG,
} from './accountActions';

const initialState = fromJS({
  loading: false,
  error: '',
  dialog: '',
  openDialog: false,
});

function accountReducer(state = initialState, action) {
  switch(action.type){
    case ACCOUNT_UPDATE_FETCH: 
      return state.merge({
        loading: true,
        error: '',
      })
    case ACCOUNT_UPDATE_SUCCESS: 
      return state.merge({
        loading: false,
        dialog: initialState.get('dialog'),
      })
    case ACCOUNT_UPDATE_ERROR: 
      return state.merge({
        loading: false,
        error: action.payload,
      })
    case OPEN_ACCOUNT_DIALOG:
      return state.merge({
        loading: initialState.get('loading'),
        error: initialState.get('error'),
        dialog: action.payload,
        openDialog: true,
      })
    case CLOSE_ACCOUNT_DIALOG:
      return state.merge({
        loading: initialState.get('loading'),
        error: initialState.get('error'),
        openDialog: initialState.get('openDialog'),
      })
    default:
      return state;
  }
}

export default accountReducer;
