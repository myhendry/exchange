import React, { useEffect } from "react";
import { connect } from "react-redux";

import Trades from "./Trades";
import OrderBook from "./OrderBook";
import MyTransactions from "./MyTransactions";
import { loadAllOrders, subscribeToEvents } from "../store/interactions";
import { exchangeSelector } from "../store/selectors";

const Content = ({ dispatch, exchange }) => {
  useEffect(() => {
    loadBlockchainData(dispatch);
  }, []);

  const loadBlockchainData = async (dispatch) => {
    await loadAllOrders(exchange, dispatch);
    await subscribeToEvents(exchange, dispatch);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <h1 className="font-bold text-purple-500">Content</h1>
      <Trades />
      <OrderBook />
      <MyTransactions />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    exchange: exchangeSelector(state),
  };
};

export default connect(mapStateToProps)(Content);
