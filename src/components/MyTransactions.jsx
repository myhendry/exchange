import React from "react";
import { connect } from "react-redux";

import {
  myFilledOrdersLoadedSelector,
  myFilledOrdersSelector,
  myOpenOrdersLoadedSelector,
  myOpenOrdersSelector,
} from "../store/selectors";

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

const showMyOpenOrders = (myOpenOrders) => {
  return (
    <div>
      {myOpenOrders.map((order) => {
        return (
          <div key={order.id}>
            <p>{order.formattedTimestamp}</p>
            <p>{order.tokenAmount}</p>
            <p>{order.tokenPrice}</p>
          </div>
        );
      })}
    </div>
  );
};

const MyTransactions = ({
  myFilledOrders,
  showMyFilledOrders,
  myOpenOrders,
  showMyOpenedOrders,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <h1 className="font-bold text-purple-500">My Transactions</h1>
      <h3 className="font-bold text-purple-500">My Filled Orders</h3>
      {showMyFilledOrders ? (
        showMyFillOrders(myFilledOrders)
      ) : (
        <h2>Loading...</h2>
      )}
      <h3 className="font-bold text-purple-500">My Open Orders</h3>
      {showMyOpenedOrders ? (
        showMyOpenOrders(myOpenOrders)
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    myFilledOrders: myFilledOrdersSelector(state),
    showMyFilledOrders: myFilledOrdersLoadedSelector(state),
    myOpenOrders: myOpenOrdersSelector(state),
    showMyOpenedOrders: myOpenOrdersLoadedSelector(state),
  };
};

export default connect(mapStateToProps)(MyTransactions);
