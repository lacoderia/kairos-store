import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from 'src/reducers';
import { Map as map } from 'immutable';

const store = createStore(
  reducers, 
  map(),
  composeWithDevTools(
    applyMiddleware(
      thunk,
    )
  )
);

export default store;
