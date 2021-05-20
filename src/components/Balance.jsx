import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { loadBalances, depositEther, withdrawEther, depositToken, withdrawToken } from '../store/interactions'
import {etherDepositAmountChanged, etherWithdrawAmountChanged, tokenDepositAmountChanged, tokenWithdrawAmountChanged} from '../store/actions'
import { web3Selector, exchangeSelector, tokenSelector, accountSelector, etherBalanceSelector, tokenBalanceSelector, exchangeEtherBalanceSelector, exchangeTokenBalanceSelector, balancesLoadingSelector, etherDepositAmountSelector, etherWithdrawAmountSelector, tokenDepositAmountSelector, tokenWithdrawAmountSelector } from '../store/selectors'

const showForm = (props) => {
  const {
    dispatch,
    exchange,
    web3,
    account,
    etherBalance,
    tokenBalance,
    exchangeEtherBalance,
    exchangeTokenBalance,
    etherDepositAmount,
    token,
    tokenDepositAmount,
    etherWithdrawAmount,
    tokenWithdrawAmount
  } = props

  return (
    <div>
      <p>WALLET ETHER BALANCE : {etherBalance}</p>
      <p>WALLET TOKEN BALANCE :{tokenBalance}</p>
      <p>EXCHANGE ETHER BALANCE :{exchangeEtherBalance}</p>
      <p>EXCHANGE TOKEN BALANCE :{exchangeTokenBalance}</p>
      <div>
      <h2>DEPOSIT ETHER</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          depositEther(dispatch, exchange, web3, etherDepositAmount, account)
        }}>
          <input 
            type="text"
            placeholder="ETH AMOUNT"
            onChange={(e) => dispatch(etherDepositAmountChanged(e.target.value))}
            required
          />
          <button type="submit">Deposit</button>
        </form>
      </div>
      <div>
        <h2>WITHDRAW ETHER</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          withdrawEther(dispatch, exchange, web3, etherWithdrawAmount, account)
        }}>
          <input 
            type="text"
            placeholder="ETH AMOUNT"
            onChange={(e) => dispatch(etherWithdrawAmountChanged(e.target.value))}
            required
          />
          <button type="submit">Deposit</button>
        </form>
      </div>
      <div>
        <h2>DEPOSIT TOKEN</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          depositToken(dispatch, exchange, web3, token, tokenDepositAmount, account)
        }}>
          <input 
            type="text"
            placeholder="TOKEN AMOUNT"
            onChange={(e) => dispatch(tokenDepositAmountChanged(e.target.value))}
            required
          />
          <button type="submit">Deposit</button>
        </form>
      </div>
      <div>
        <h2>WITHDRAW TOKEN</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          withdrawToken(dispatch, exchange, web3, token, tokenWithdrawAmount, account)
        }}>
          <input 
            type="text"
            placeholder="TOKEN AMOUNT"
            onChange={(e) => dispatch(tokenWithdrawAmountChanged(e.target.value))}
            required
          />
          <button type="submit">Withdraw</button>
        </form>
      </div>
    </div>
  )
}

class Balance extends React.Component {
componentWillMount() {
  this.loadBlockchainData()
}

async loadBlockchainData() {
  const {dispatch, web3, exchange, token, account} = this.props

  await loadBalances(dispatch, web3, exchange, token, account)
}

  render() {
    return (
      <div>
        <h1>Balances</h1>
        {this.props.displayForm ? showForm(this.props) : <h1>Loading...</h1>}

      </div>
    )
  }
}

const mapStateToProps = (state) => {
    const balancesLoading = balancesLoadingSelector(state)

  return {
    account: accountSelector(state),
    exchange: exchangeSelector(state),
    token: tokenSelector(state),
    web3: web3Selector(state),
    etherBalance: etherBalanceSelector(state),
    tokenBalance: tokenBalanceSelector(state),
    exchangeEtherBalance: exchangeEtherBalanceSelector(state),
    exchangeTokenBalance: exchangeTokenBalanceSelector(state),
    balancesLoading,
    displayForm: !balancesLoading,
    etherDepositAmount: etherDepositAmountSelector(state),
    etherWithdrawAmount: etherWithdrawAmountSelector(state),
    tokenDepositAmount: tokenDepositAmountSelector(state),
    tokenWithdrawAmount:
    tokenWithdrawAmountSelector(state)

  }
}

export default connect(mapStateToProps)(Balance)

// const showForm = (props) => {
//   const { etherBalance, tokenBalance, exchangeEtherBalance, exchangeTokenBalance } = props

//   return (
//     <div>
//       <h1>{etherBalance}</h1>
//       <p>{tokenBalance}</p>
//       <p>{exchangeEtherBalance}</p>
//       <p>{exchangeTokenBalance}</p>
//     </div>
//   )
// }

// const Balance = (props) => {
//   useEffect(() => {
//     const {exchange, dispatch, token, account, web3} = props
//     const loadBlockchainData = async (dispatch, web3, exchange, token, account) => {
//       await loadBalances(dispatch, web3, exchange, token, account)
//     }
//     loadBlockchainData(dispatch, web3, exchange, token, account)
//   }, [props])

//   return (
//     <div>
//       <h1>Balance</h1>
//       {props.displayForm ? showForm(props) : <h1>Loading...</h1>}
//     </div>
//   )
// }

// const mapStateToProps = (state) => {
//   const balancesLoading = balancesLoadingSelector(state)

//   return {
//     account: accountSelector(state),
//     exchange: exchangeSelector(state),
//     token: tokenSelector(state),
//     web3: web3Selector(state),
//     etherBalance: etherBalanceSelector(state),
//     tokenBalance: tokenBalanceSelector(state),
//     exchangeEtherBalance: exchangeEtherBalanceSelector(state),
//     exchangeTokenBalance: exchangeTokenBalanceSelector(state),
//     balancesLoading,
//     displayForm: !balancesLoading

//   }
// }

// export default  connect(mapStateToProps)(Balance)
