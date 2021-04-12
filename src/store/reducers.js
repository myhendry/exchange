import { combineReducers } from "redux";

import {
  WEB3_LOADED,
  WEB3_ACCOUNT_LOADED,
  TOKEN_LOADED,
  EXCHANGE_LOADED,
} from "./actions";

const web3 = (state = {}, action) => {
  switch (action.type) {
    case WEB3_LOADED:
      return { ...state, connection: action.connection };
    case WEB3_ACCOUNT_LOADED:
      return {
        ...state,
        account: action.account,
      };
    default:
      return state;
  }
};

const token = (state = {}, action) => {
  switch (action.type) {
    case TOKEN_LOADED:
      return {
        ...state,
        loaded: true,
        contract: action.contract,
      };
    default:
      return state;
  }
};

const exchange = (state = {}, action) => {
  switch (action.type) {
    case EXCHANGE_LOADED:
      return {
        ...state,
        loaded: true,
        contract: action.contract,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  web3,
  token,
  exchange,
});

export default rootReducer;
