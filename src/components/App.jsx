import React from "react";
import { connect } from "react-redux";

import { accountSelector, contractsLoadedSelector } from "../store/selectors";

import {
  loadWeb3,
  loadAccount,
  loadToken,
  loadExchange,
} from "../store/interactions";
import Content from "./Content";
import Balance from './Balance'

class App extends React.Component {
  componentWillMount() {
    this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {
    const web3 = await loadWeb3(dispatch)
    const networkId = await web3.eth.net.getId()
    await loadAccount(web3, dispatch)
    const token = await loadToken(web3, networkId, dispatch)
    if(!token) {
      window.alert('Token smart contract not detected on the current network. Please select another network with Metamask.')
      return
    }
    const exchange = await loadExchange(web3, networkId, dispatch)
    if(!exchange) {
      window.alert('Exchange smart contract not detected on the current network. Please select another network with Metamask.')
      return
    }
  }

  
  render() {
    return (
<div>
      <h1>Deposits 45:17</h1>
      <h5>{this.props.account}</h5>
      {this.props.contractsLoaded ? (
        <div>
        <Balance />
        <Content />
        </div>
      ) : (
        <div>
          <h1 className="font-bold text-green-500">No Content</h1>
        </div>
      )}

    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contractsLoaded: contractsLoadedSelector(state),
    account: accountSelector(state),
  };
};

export default connect(mapStateToProps)(App);



// import React, { useEffect } from "react";
// import { connect } from "react-redux";

// import { accountSelector, contractsLoadedSelector } from "../store/selectors";

// import {
//   loadWeb3,
//   loadAccount,
//   loadToken,
//   loadExchange,
// } from "../store/interactions";
// import Content from "./Content";
// import Balance from './Balance'

// const App = ({ dispatch, account, contractsLoaded }) => {
//   useEffect(() => {
//     loadBlockchain(dispatch);
//   }, [dispatch]);

//   const loadBlockchain = async (dispatch) => {
//     // Modern dapp browsers...
//     if (window.ethereum) {
//       try {
//         await window.ethereum.enable();
//         const web3 = await loadWeb3(dispatch);
//         const networkId = await web3.eth.net.getId();
//         await loadAccount(dispatch, web3);
//         const token = await loadToken(web3, networkId, dispatch);
//         if (!token) {
//           window.alert(
//             "Token smart contract not detected on the current network. Please select another network with Metamask"
//           );
//           return;
//         }
//         const exchange = await loadExchange(web3, networkId, dispatch);
//         if (!exchange) {
//           window.alert(
//             "Exchange smart contract not detected on the current network. Please select another network with Metamask"
//           );
//           return;
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     // Non-dapp browsers...
//     else {
//       console.log(
//         "Non-Ethereum browser detected. You should consider trying MetaMask!"
//       );
//     }
//   };

//   return (
//     <div>
//       <h1>Deposits 45:17</h1>
//       <h5>{account}</h5>
//       <Balance />
//       {contractsLoaded ? (
//         <Content />
//       ) : (
//         <div>
//           <h1 className="font-bold text-green-500">No Content</h1>
//         </div>
//       )}

//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     contractsLoaded: contractsLoadedSelector(state),
//     account: accountSelector(state),
//   };
// };

// export default connect(mapStateToProps)(App);
