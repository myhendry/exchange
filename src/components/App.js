import React, { useEffect } from "react";
import Web3 from "web3";

export default () => {
  useEffect(() => {
    loadBlockchain();
  }, []);

  const loadBlockchain = async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0], networkId);
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
