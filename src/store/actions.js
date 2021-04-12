export const WEB3_LOADED = "WEB3_LOADED";
export const WEB3_ACCOUNT_LOADED = "WEB3_ACCOUNT_LOADED";
export const TOKEN_LOADED = "TOKEN_LOADED";
export const EXCHANGE_LOADED = "EXCHANGE_LOADED";

export const web3Loaded = (connection) => {
  return {
    type: WEB3_LOADED,
    connection,
  };
};

export const web3AccountLoaded = (account) => {
  return {
    type: WEB3_ACCOUNT_LOADED,
    account,
  };
};

export const tokenLoaded = (contract) => {
  return {
    type: TOKEN_LOADED,
    contract,
  };
};

export const exchangeLoaded = (contract) => {
  return {
    type: EXCHANGE_LOADED,
    contract,
  };
};
