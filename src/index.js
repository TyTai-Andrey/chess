import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


import {rootReducer} from './REDUX/rootReducer';
import './index.scss';
import App from './App';

const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk
  )


  // Это расширение для хрома Redux DevTools

  , 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))


ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);
