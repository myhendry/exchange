import React from "react";
import { connect } from "react-redux";

import {
  myFilledOrdersLoadedSelector,
  myFilledOrdersSelector,
  myOpenOrdersLoadedSelector,
  myOpenOrdersSelector,
  exchangeSelector,
  accountSelector,
  orderCancellingSelector,
} from "../store/selectors";
import { cancelOrder } from "../store/interactions";

const showMyFillOrders = (myFilledOrders) => {
  return (
    <div>
      {myFilledOrders.map((order) => {
        return (
          <div key={order.id}>
            <p>{order.formattedTimestamp}</p>
            <p>
              {order.orderSign} {order.tokenAmount}
            </p>
            <p>{order.tokenPrice}</p>
          </div>
        );
      })}
    </div>
  );
};

const showMyOpenOrders = (props) => {
  console.log("props", props);
  const { myOpenOrders, dispatch, exchange, account } = props;
  return (
    <div>
      {myOpenOrders.map((order) => {
        return (
          <div key={order.id}>
            <p>{order.formattedTimestamp}</p>
            <p>{order.tokenAmount}</p>
            <p>{order.tokenPrice}</p>
            <h3
              onClick={() => {
                cancelOrder(dispatch, exchange, order, account);
              }}
            >
              X
            </h3>
          </div>
        );
      })}
    </div>
  );
};

const MyTransactions = (props) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <h1 className="font-bold text-purple-500">My Transactions</h1>
      <h3 className="font-bold text-purple-500">My Filled Orders</h3>
      {props.showMyFilledOrders ? (
        showMyFillOrders(props.myFilledOrders)
      ) : (
        <h2>Loading...</h2>
      )}
      <h3 className="font-bold text-purple-500">My Open Orders</h3>
      {props.showMyOpenedOrders ? showMyOpenOrders(props) : <h2>Loading...</h2>}
    </div>
  );
};

const mapStateToProps = (state) => {
  const myOpenOrdersLoaded = myOpenOrdersLoadedSelector(state);
  const orderCancelling = orderCancellingSelector(state);

  return {
    myFilledOrders: myFilledOrdersSelector(state),
    showMyFilledOrders: myFilledOrdersLoadedSelector(state),
    myOpenOrders: myOpenOrdersSelector(state),
    showMyOpenedOrders: myOpenOrdersLoaded && !orderCancelling,
    exchange: exchangeSelector(state),
    account: accountSelector(state),
  };
};

export default connect(mapStateToProps)(MyTransactions);
