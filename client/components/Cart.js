import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrders, deleteOrder} from '../store/orders'
import {getActiveCart, checkout} from '../store/carts'
import {SinglePizza} from './index'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

class Cart extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchActiveCart()
    this.props.fetchOrders(this.props.cart.id)
  }

  async handleClick() {
    await this.props.finalCheckout(this.props.cart.id)
    this.props.history.push('/checkout')
  }

  async handleRemoveClick(event, pizzaId) {
    await this.props.fetchActiveCart()
    this.props.deleteOrder(this.props.cart.id, pizzaId)
  }

  onToken = amount => async token => {
    try {
      const cartId = this.props.cart.id
      await axios.post(`/api/cart/${cartId}/checkout`, {token, amount})
      this.handleClick()
    } catch (err) {
      console.error(err.message)
    }
  }

  render() {
    return (
      <div>
        {this.props.orders.map(order => {
          return (
            <div key={order.pizza.id}>
              <SinglePizza pizza={order.pizza} />
              <h2>Quantity: {order.qty}</h2>
              <button
                type="button"
                onClick={() => this.handleRemoveClick(event, order.pizza.id)}
              >
                Remove from Cart
              </button>
            </div>
          )
        })}
        <br />
        <div>
          <StripeCheckout
            token={this.onToken(2000)}
            stripeKey="pk_test_KN3SFlFyjdQi4B6xdQfwy34w"
            amount={2000}
            name="Topper the mornin' to ya!"
            image="/Grace Topper Checkout.png"
            label="Buy These Pizzas"
            panelLabel="Fork over"
            currency="USD"
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders,
  cart: state.carts.activeCart
})

const mapDispatchToProps = dispatch => ({
  fetchOrders: cartId => dispatch(getOrders(cartId)),
  fetchActiveCart: () => dispatch(getActiveCart()),
  finalCheckout: cartId => dispatch(checkout(cartId)),
  deleteOrder: (cartId, pizzaId) => dispatch(deleteOrder(cartId, pizzaId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
