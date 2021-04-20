import React from "react";
import { connect } from "react-redux";

import { orderBookSelector, orderBookLoadedSelector } from "../store/selectors";

const showOrderBook = (order) => {
  return (
    <div>
      <h2>Sell Order</h2>
      {order &&
        order.sellOrders.map((o) => (
          <p key={o.id}>
            {o.id} {o.orderType} {o.user} {o.etherAmount},{o.amountGive}{" "}
            {o.tokenAmount}
            {o.amountGet} {o.tokenPrice}
          </p>
        ))}
      <h2>Buy Order</h2>
      {order &&
        order.buyOrders.map((o) => (
          <p key={o.id}>
            {o.id} {o.orderType} {o.user} {o.etherAmount},{o.amountGive}{" "}
            {o.tokenAmount}
            {o.amountGet} {o.tokenPrice}
          </p>
        ))}
    </div>
  );
};

const OrderBook = ({ orderBookLoaded, orderBook }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <h1 className="font-bold text-purple-500">Order Book</h1>
      {orderBookLoaded ? (
        showOrderBook(orderBook)
      ) : (
        <h3>Loading Order Book...</h3>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orderBookLoaded: orderBookLoadedSelector(state),
    orderBook: orderBookSelector(state),
  };
};

export default connect(mapStateToProps)(OrderBook);
