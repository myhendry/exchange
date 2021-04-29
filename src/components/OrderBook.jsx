import React from "react";
import { connect } from "react-redux";

import { fillOrder } from "../store/interactions";
import {
  orderBookSelector,
  orderBookLoadedSelector,
  accountSelector,
  exchangeSelector,
  orderFillingSelector,
} from "../store/selectors";

const showOrderBook = (order, props) => {
  const { dispatch, exchange, account } = props;

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
          <div key={o.id}>
            <p>
              {o.id} {o.orderType} {o.user} {o.etherAmount},{o.amountGive}{" "}
              {o.tokenAmount}
              {o.amountGet} {o.tokenPrice}
            </p>
            <p
              onClick={() => {
                fillOrder(dispatch, exchange, o, account);
              }}
            >
              Buy
            </p>
          </div>
        ))}
    </div>
  );
};

const OrderBook = (props) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <h1 className="font-bold text-purple-500">Order Book</h1>
      {props.orderBookLoaded ? (
        showOrderBook(props.orderBook, props)
      ) : (
        <h3>Loading Order Book...</h3>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const orderBookLoaded = orderBookLoadedSelector(state);
  const orderFilling = orderFillingSelector(state);
  return {
    orderBookLoaded: orderBookLoaded && !orderFilling,
    orderBook: orderBookSelector(state),
    account: accountSelector(state),
    exchange: exchangeSelector(state),
  };
};

export default connect(mapStateToProps)(OrderBook);
