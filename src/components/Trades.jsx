import React from "react";
import { connect } from "react-redux";

import {
  filledOrdersSelector,
  filledOrdersLoadedSelector,
} from "../store/selectors";

const Trades = ({ filledOrdersLoaded, filledOrders }) => {
  return (
    <div>
      <h1>Trades</h1>
      {filledOrdersLoaded ? (
        filledOrders.map((order) => {
          return (
            <div key={order.id}>
              <hr />
              <h3>{order.id}</h3>
              <h4 className=" text-red-500">
                {order.tokenGive} {order.amountGive}
              </h4>
              <h4 className=" text-green-500">
                {order.tokenGet}
                {order.amountGet}
              </h4>
            </div>
          );
        })
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filledOrdersLoaded: filledOrdersLoadedSelector(state),
    filledOrders: filledOrdersSelector(state),
  };
};

export default connect(mapStateToProps)(Trades);
