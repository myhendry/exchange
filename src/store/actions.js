export const WEB3_LOADED = "WEB3_LOADED";
export const WEB3_ACCOUNT_LOADED = "WEB3_ACCOUNT_LOADED";
export const TOKEN_LOADED = "TOKEN_LOADED";
export const EXCHANGE_LOADED = "EXCHANGE_LOADED";
export const CANCELLED_ORDERS_LOADED = "CANCELLED_ORDERS_LOADED";
export const FILLED_ORDERS_LOADED = "FILLED_ORDERS_LOADED";
export const ALL_ORDERS_LOADED = "ALL_ORDERS_LOADED";
export const ORDER_CANCELLING = "ORDER_CANCELLING";
export const ORDER_CANCELLED = "ORDER_CANCELLED";
export const ORDER_FILLING = "ORDER_FILLING";
export const ORDER_FILLED = "ORDER_FILLED";
export const ETHER_BALANCE_LOADED = 'ETHER_BALANCE_LOADED'
export const TOKEN_BALANCE_LOADED = 'TOKEN_BALANCE_LOADED'
export const EXCHANGE_ETHER_BALANCE_LOADED = 'EXCHANGE_ETHER_BALANCE_LOADED'
export const EXCHANGE_TOKEN_BALANCE_LOADED = "EXCHANGE_TOKEN_BALANCE_LOADED"
export const BALANCES_LOADED = 'BALANCES_LOADED'
export const BALANCES_LOADING = 'BALANCES_LOADING'
export const ETHER_DEPOSIT_AMOUNT_CHANGED = 'ETHER_DEPOSIT_AMOUNT_CHANGED'
export const ETHER_WITHDRAW_AMOUNT_CHANGED = 'ETHER_WITHDRAW_AMOUNT_CHANGED'
export const TOKEN_DEPOSIT_AMOUNT_CHANGED = 'TOKEN_DEPOSIT_AMOUNT_CHANGED'
export const TOKEN_WITHDRAW_AMOUNT_CHANGED = 'TOKEN_WITHDRAW_AMOUNT_CHANGED'

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

export const orderCancelling = () => {
  return {
    type: ORDER_CANCELLING,
  };
};

export const orderCancelled = (order) => {
  return {
    type: ORDER_CANCELLED,
    order,
  };
};

export const orderFilling = () => {
  return {
    type: ORDER_FILLING,
  };
};

export const orderFilled = (order) => {
  return {
    type: ORDER_FILLED,
    order,
  };
};

export const etherBalanceLoaded = (balance) => {
  return {
    type: ETHER_BALANCE_LOADED,
    balance
  }
}

export const tokenBalanceLoaded = (balance) => {
  return {
    type: TOKEN_BALANCE_LOADED,
    balance
  }
}

export const exchangeEtherBalanceLoaded = (balance) => {
  return {
    type: EXCHANGE_ETHER_BALANCE_LOADED,
    balance
  }
}

export const exchangeTokenBalanceLoaded = (balance) => {
  return {
    type: EXCHANGE_TOKEN_BALANCE_LOADED,
    balance
  }
}

export const balancesLoaded = () => {
  return {
    type: BALANCES_LOADED,
    
  }
}

export const balancesLoading = () => {
  return {
    type: BALANCES_LOADING,
    
  }
}

export const etherDepositAmountChanged = (amount) => {
  return {
    type: ETHER_DEPOSIT_AMOUNT_CHANGED,
    amount
  }
}

export const etherWithdrawAmountChanged = (amount) => {
  return {
    type: ETHER_WITHDRAW_AMOUNT_CHANGED,
    amount
  }
}

export const tokenDepositAmountChanged = amount => {
  return {
    type: TOKEN_DEPOSIT_AMOUNT_CHANGED,
    amount
  }
}

export const tokenWithdrawAmountChanged = amount => {
  return {
    type: TOKEN_WITHDRAW_AMOUNT_CHANGED,
    amount
  }
}