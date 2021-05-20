import React from 'react'
import {connect} from 'react-redux'
import {exchangeSelector, tokenSelector, accountSelector, web3Selector, buyOrderSelector, sellOrderSelector} from '../store/selectors'
import {buyOrderAmountChanged, buyOrderPriceChanged, sellOrderAmountChanged, sellOrderPriceChanged} from '../store/actions'
import { makeBuyOrder, makeSellOrder } from '../store/interactions'

const showForm = (props) => {
  const {dispatch, exchange, token, web3, buyOrder, account, sellOrder, showBuyTotal, showSellTotal } = props
   
  return (
    <div>
      <div>
      <h2>BUY ORDER (DAPP)</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          makeBuyOrder(dispatch, exchange, token, web3, buyOrder, account)
        }}>
          <input 
            type="text"
            placeholder="BUY AMOUNT"
            onChange={(e) => dispatch(buyOrderAmountChanged(e.target.value))}
            required
          />
          <input 
            type="text"
            placeholder="BUY PRICE"
            onChange={(e) => dispatch(buyOrderPriceChanged(e.target.value))}
            required
          />
          <button type="submit">Buy Order</button>
          <div>
            { showBuyTotal ?           <small>
            Total: {buyOrder.amount * buyOrder.price} ETH
          </small> : null}
          </div>
        </form>
      </div>
      <div>
      <h2>SELL ORDER (DAPP)</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          makeSellOrder(dispatch, exchange, token, web3, sellOrder, account)
        }}>
          <input 
            type="text"
            placeholder="SELL AMOUNT"
            onChange={(e) => dispatch(sellOrderAmountChanged(e.target.value))}
            required
          />
          <input 
            type="text"
            placeholder="SELL PRICE"
            onChange={(e) => dispatch(sellOrderPriceChanged(e.target.value))}
            required
          />
          <button type="submit">Sell Order</button>
          <div>
            { showSellTotal ?           <small>
            Total: {sellOrder.amount * sellOrder.price} ETH
          </small> : null}
          </div>
        </form>
      </div>
    </div>
  )
}

const NewOrder = (props) => {
  return (
    <div>
      <h1>New Order</h1>
      {showForm(props)}
    </div>
  )
}

const mapStateToProps = state => {
  const buyOrder = buyOrderSelector(state)
  const sellOrder = sellOrderSelector(state)
  
  return {
    account: accountSelector(state),
    exchange: exchangeSelector(state),
    token: tokenSelector(state),
    web3: web3Selector(state),
    buyOrder,
    sellOrder,
    showForm: !buyOrder.making & !sellOrder.making,
    showBuyTotal: buyOrder.amount && buyOrder.price,
    showSellTotal: sellOrder.amount && sellOrder.price
  }
}

export default connect(mapStateToProps)(NewOrder)
