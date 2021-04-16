import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import ReduxThunk from "redux-thunk";

import rootReducer from "./reducers";

const loggerMiddleware = createLogger();
const middleware = [ReduxThunk];

// For Redux Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (preloadedState) => {
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware, loggerMiddleware))
  );
};

export default configureStore;
