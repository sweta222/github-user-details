import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducer';
import { combinedAction } from './interfaces';
import { ThunkMiddleware } from 'redux-thunk';
//we can also replace/put initialState in the place of appState bcz the returntype of reducer func is defined same,,so appState=initialState
export type appState = ReturnType<typeof reducer>;
const store = createStore(
  reducer,
  applyMiddleware(thunk as ThunkMiddleware<appState, combinedAction>)
);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
