import { combineReducers } from "redux";

import {
  WEB3_LOADED,
  WEB3_ACCOUNT_LOADED,
  TOKEN_LOADED,
  EXCHANGE_LOADED,
  CANCELLED_ORDERS_LOADED,
  FILLED_ORDERS_LOADED,
  ALL_ORDERS_LOADED,
  ORDER_CANCELLING,
  ORDER_CANCELLED,
  ORDER_FILLING,
  ORDER_FILLED,
  BALANCES_LOADING,
  BALANCES_LOADED,
  EXCHANGE_ETHER_BALANCE_LOADED,
  EXCHANGE_TOKEN_BALANCE_LOADED,
  ETHER_BALANCE_LOADED,
  TOKEN_BALANCE_LOADED,
  ETHER_DEPOSIT_AMOUNT_CHANGED,
  ETHER_WITHDRAW_AMOUNT_CHANGED,
  TOKEN_DEPOSIT_AMOUNT_CHANGED,
  TOKEN_WITHDRAW_AMOUNT_CHANGED

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
    case ETHER_BALANCE_LOADED:
      return {
        ...state, balance: action.balance
      }
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
    case TOKEN_BALANCE_LOADED:
      return {
        ...state,
        balance: action.balance
      }
    default:
      return state;
  }
};

const exchange = (state = {}, action) => {
  let index, data
  
  switch (action.type) {
    case EXCHANGE_LOADED:
      return {
        ...state,
        loaded: true,
        contract: action.contract,
      };
    case CANCELLED_ORDERS_LOADED:
      return {
        ...state,
        cancelledOrders: { loaded: true, data: action.cancelledOrders },
      };
    case FILLED_ORDERS_LOADED:
      return {
        ...state,
        filledOrders: {
          loaded: true,
          data: action.filledOrders,
        },
      };
    case ALL_ORDERS_LOADED:
      return {
        ...state,
        allOrders: {
          loaded: true,
          data: action.allOrders,
        },
      };
    case ORDER_CANCELLING:
      return { ...state, orderCancelling: true };
    case ORDER_CANCELLED:
      return {
        ...state,
        orderCancelling: false,
        cancelledOrders: {
          ...state.cancelledOrders,
          data: [...state.cancelledOrders.data, action.order],
        },
      };
    case ORDER_FILLING:
      return { ...state, orderFilling: true };
    case ORDER_FILLED:
      // Prevent Duplicate Orders
      index = state.filledOrders.data.findIndex(order => order.id === action.order.id)

      if (index === -1) {
        data = [...state.filledOrders.data, action.order]
      } else {
        data = state.filledOrders.data
      }
      
      return {
        ...state,
        orderFilling: false,
        filledOrders: {
          ...state.filledOrders,
          data
        }
      }
    case EXCHANGE_ETHER_BALANCE_LOADED:
      return {
        ...state,
        etherBalance: action.balance
      }
    case EXCHANGE_TOKEN_BALANCE_LOADED:
      return {
        ...state,
        tokenBalance: action.balance
      }
    case BALANCES_LOADING:
      return {
        ...state, balancesLoading: true
      }
    case BALANCES_LOADED:
      return {
        ...state, balancesLoading: false
      }
    case ETHER_DEPOSIT_AMOUNT_CHANGED:
      return {
        ...state, etherDepositAmount: action.amount
      }
    case ETHER_WITHDRAW_AMOUNT_CHANGED:
      return {
        ...state, etherWithdrawAmount: action.amount
      }
    case TOKEN_DEPOSIT_AMOUNT_CHANGED:
      return {
        ...state,
        tokenDepositAmount: action.amount
      }
    case TOKEN_WITHDRAW_AMOUNT_CHANGED: 
      return {
        ...state,
        tokenWithdrawAmount: action.amount
      }
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
