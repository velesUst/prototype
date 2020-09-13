import * as React from "react";
import * as ReactDOM from "react-dom";
import  App from "./Components/App";
import  Home from "./Components/BTD/Home";
import { HashRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import { rootReducer } from './reducers'
import { watcherSaga } from "./sagas/sagas";
import { watcherAuthSaga } from "./sagas/sagasAuth";
import { composeWithDevTools } from 'redux-devtools-extension';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// dev tools middleware
// const reduxDevTools =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// create a redux store with our reducer above and middleware
const composeEnhancers = composeWithDevTools({});// (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

// run the saga
sagaMiddleware.run(watcherSaga);
sagaMiddleware.run(watcherAuthSaga);

ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>, document.getElementById("container"));

//registerServiceWorker();