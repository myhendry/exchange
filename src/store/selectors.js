import { get, groupBy, reject } from "lodash";
import { createSelector } from "reselect";
import moment from "moment";

import { ETHER_ADDRESS, tokens, ether, GREEN, RED } from "../helpers";

const account = (state) => get(state, "web3.account");
export const accountSelector = createSelector(account, (a) => a);

const tokenLoaded = (state) => get(state, "token.loaded", false);
export const tokenLoadedSelector = createSelector(tokenLoaded, (tl) => tl);

const exchangeLoaded = (state) => get(state, "exchange.loaded", false);
export const exchangeLoadedSelector = createSelector(
  exchangeLoaded,
  (el) => el
);

const exchange = (state) => get(state, "exchange.contract");
export const exchangeSelector = createSelector(exchange, (e) => e);

export const contractsLoadedSelector = createSelector(
  tokenLoaded,
  exchangeLoaded,
  (tl, el) => tl && el
);

// Filled Orders
const filledOrdersLoaded = (state) =>
  get(state, "exchange.filledOrders.loaded", false);
export const filledOrdersLoadedSelector = createSelector(
  filledOrdersLoaded,
  (o) => o
);

const filledOrders = (state) => get(state, "exchange.filledOrders.data", []);

export const filledOrdersSelector = createSelector(filledOrders, (orders) => {
  // Sort orders by date ascending for price comparison
  orders = orders.sort((a, b) => a.timestamp - b.timestamp);

  //Decorate the orders
  orders = decorateFilledOrders(orders);
  // sort orders by timestamp

  orders = orders.sort((a, b) => b.timestamp - a.timestamp);

  return orders;
});

const decorateFilledOrders = (orders) => {
  // Track previous order to compare history
  let previousOrder = orders[0];
  return (orders = orders.map((order) => {
    order = decorateOrder(order);
    order = decorateFilledOrder(order, previousOrder);
    previousOrder = order; // Update the previous order once its decorated
    return order;
  }));
};

const decorateOrder = (order) => {
  let etherAmount;
  let tokenAmount;

  if (order.tokenGive === ETHER_ADDRESS) {
    etherAmount = order.amountGive;
    tokenAmount = order.amountGet;
  } else {
    etherAmount = order.amountGet;
    tokenAmount = order.amountGive;
  }

  // Calculate token price to 5 decimal places
  const precision = 1000000;
  let tokenPrice = etherAmount / tokenAmount;
  tokenPrice = Math.round(tokenPrice * precision) / precision;

  return {
    ...order,
    etherAmount: ether(etherAmount),
    tokenAmount: tokens(tokenAmount),
    tokenPrice,
    formattedTimestamp: moment.unix(order.timestamp).format("h:mm:ss a M/D"),
  };
};

const decorateFilledOrder = (order, previousOrder) => {
  return {
    ...order,
    tokenPriceClass: tokenPriceClass(order.tokenPrice, order.id, previousOrder),
  };
};

const tokenPriceClass = (tokenPrice, orderId, previousOrder) => {
  // Show Green if no Previous Order exists
  if (previousOrder.id === orderId) {
    return GREEN;
  }
  // Show green price if order price higher than previous order
  if (previousOrder.tokenPrice <= tokenPrice) {
    return GREEN; // success
  }
  // Show red price if order price lower than previous order
  else {
    return RED; // danger
  }
};

// Cancelled Orders
const cancelledOrdersLoaded = (state) =>
  get(state, "exchange.cancelledOrders.loaded", false);
export const cancelledOrdersLoadedSelector = createSelector(
  cancelledOrdersLoaded,
  (loaded) => loaded
);

const cancelledOrders = (state) =>
  get(state, "exchange.cancelledOrders.data", []);

export const cancelledOrdersSelector = createSelector(
  cancelledOrders,
  (o) => o
);

// All Orders
const allOrdersLoaded = (state) =>
  get(state, "exchange.allOrders.loaded", false);

export const allOrdersLoadedSelector = createSelector(
  allOrdersLoaded,
  (loaded) => loaded
);

const allOrders = (state) => get(state, "exchange.allOrders.data", []);

export const allOrdersSelector = createSelector(allOrders, (a) => a);

const openOrders = (state) => {
  const all = allOrders(state);
  const cancelled = cancelledOrders(state);
  const filled = filledOrders(state);

  const openOrders = reject(all, (order) => {
    const orderFilled = filled.some((o) => o.id === order.id);
    const orderCancelled = cancelled.some((o) => o.id === order.id);
    return orderFilled || orderCancelled;
  });
  return openOrders;
};

const orderBookLoaded = (state) =>
  cancelledOrdersLoaded(state) &&
  filledOrdersLoaded(state) &&
  allOrdersLoaded(state);

export const orderBookLoadedSelector = createSelector(
  orderBookLoaded,
  (loaded) => loaded
);

// Create the Order Book
export const orderBookSelector = createSelector(openOrders, (orders) => {
  // Decorate Orders
  orders = decorateOrderBookOrders(orders);
  // Group orders by 'orderType'
  orders = groupBy(orders, "orderType");
  // Fetch Buy Orders
  const buyOrders = get(orders, "buy", []);
  // Sort by orders by token price
  orders = {
    ...orders,
    buyOrders: buyOrders.sort((a, b) => b.tokenPrice - a.tokenPrice),
  };

  // Fetch Sell Orders
  const sellOrders = get(orders, "sell", []);
  // Sort by orders by token price
  orders = {
    ...orders,
    sellOrders: sellOrders.sort((a, b) => b.tokenPrice - a.tokenPrice),
  };
  return orders;
});

const decorateOrderBookOrders = (orders) => {
  return orders.map((order) => {
    order = decorateOrder(order);
    order = decorateOrderBookOrder(order);
    return order;
  });
};

const decorateOrderBookOrder = (order) => {
  const orderType = order.tokenGive === ETHER_ADDRESS ? "buy" : "sell";

  return {
    ...order,
    orderType,
    orderTypeClass: orderType === "buy" ? GREEN : RED,
    orderFillClass: orderType === "buy" ? "sell" : "buy",
  };
};

export const myFilledOrdersLoadedSelector = createSelector(
  filledOrdersLoaded,
  (loaded) => loaded
);

export const myFilledOrdersSelector = createSelector(
  account,
  filledOrders,
  (account, orders) => {
    // Find our orders
    orders = orders.filter((o) => o.user === account || o.userFill === account);
    // Sort by Date Ascending
    orders = orders.sort((a, b) => a.timestamp - b.timestamp);
    orders = decorateMyFilledOrders(orders, account);
    return orders;
  }
);

const decorateMyFilledOrders = (orders, account) => {
  return orders.map((order) => {
    order = decorateOrder(order);
    order = decorateMyFilledOrder(order, account);
    return order;
  });
};

const decorateMyFilledOrder = (order, account) => {
  const myOrder = order.user === account;

  let orderType;
  if (myOrder) {
    orderType = order.tokenGive === ETHER_ADDRESS ? "buy" : "sell";
  } else {
    orderType = order.tokenGive === ETHER_ADDRESS ? "sell" : "buy";
  }

  return {
    ...order,
    orderType,
    orderTypeClass: orderType === "buy" ? GREEN : RED,
    orderSign: orderType === "buy" ? "+" : "-",
  };
};

export const myOpenOrdersLoadedSelector = createSelector(
  orderBookLoaded,
  (loaded) => loaded
);

export const myOpenOrdersSelector = createSelector(
  account,
  openOrders,
  (account, orders) => {
    // Filter orders created by current account
    orders = orders.filter((o) => o.user === account);
    // Decorate orders - add display attributes
    orders = decorateMyOpenOrders(orders);
    // Sort orders by date descending
    orders = orders.sort((a, b) => b.timestamp - a.timestamp);
    return orders;
  }
);

const decorateMyOpenOrders = (orders, account) => {
  return orders.map((order) => {
    order = decorateOrder(order);
    order = decorateMyOpenOrder(order, account);
    return order;
  });
};

const decorateMyOpenOrder = (order, account) => {
  let orderType = order.tokenGive === ETHER_ADDRESS ? "buy" : "sell";

  return {
    ...order,
    orderType,
    orderTypeClass: orderType === "buy" ? GREEN : RED,
  };
};
