import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  loadWeb3,
  loadAccount,
  loadToken,
  loadExchange,
} from "../store/interactions";

const App = ({ dispatch }) => {
  useEffect(() => {
    loadBlockchain(dispatch);
  }, []);

  const loadBlockchain = async (dispatch) => {
    // Modern dapp browsers...
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const web3 = loadWeb3(dispatch);
        const networkId = await web3.eth.net.getId();
        await loadAccount(dispatch, web3);
        await loadToken(web3, networkId, dispatch);
        await loadExchange(web3, networkId, dispatch);
      } catch (error) {
        console.log(error);
      }
    }
    // Non-dapp browsers...
    else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(App);
