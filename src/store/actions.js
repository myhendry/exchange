export const WEB3_LOADED = "WEB3_LOADED";
export const WEB3_ACCOUNT_LOADED = "WEB3_ACCOUNT_LOADED";
export const TOKEN_LOADED = "TOKEN_LOADED";
export const EXCHANGE_LOADED = "EXCHANGE_LOADED";
export const CANCELLED_ORDERS_LOADED = "CANCELLED_ORDERS_LOADED";
export const FILLED_ORDERS_LOADED = "FILLED_ORDERS_LOADED";
export const ALL_ORDERS_LOADED = "ALL_ORDERS_LOADED";

export const web3Loaded = (connection) => {
  return {
    type: WEB3_LOADED,
    connection,
  };
};

export const web3AccountLoaded = (account) => {
  return {
    type: WEB3_ACCOUNT_LOADED,
    account,
  };
};

export const tokenLoaded = (contract) => {
  return {
    type: TOKEN_LOADED,
    contract,
  };
};

export const exchangeLoaded = (contract) => {
  return {
    type: EXCHANGE_LOADED,
    contract,
  };
};

export const cancelledOrdersLoaded = (cancelledOrders) => {
  return {
    type: CANCELLED_ORDERS_LOADED,
    cancelledOrders,
  };
};

export const filledOrdersLoaded = (filledOrders) => {
  return {
    type: FILLED_ORDERS_LOADED,
    filledOrders,
  };
};

export const allOrdersLoaded = (allOrders) => {
  return {
    type: ALL_ORDERS_LOADED,
    allOrders,
  };
};
