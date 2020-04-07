import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
let composeEnhancers = null;

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
  composeEnhancers =
    (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  composeEnhancers = composeEnhancers(applyMiddleware(...middlewares));
} else {
  composeEnhancers = applyMiddleware(...middlewares);
}

export const store = createStore(rootReducer, composeEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };
