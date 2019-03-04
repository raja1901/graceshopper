import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrders, deleteOrder} from '../store/orders'
import {getActiveCart, checkout} from '../store/carts'
import {SinglePizza} from './index'

class Cart extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchActiveCart()
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

  render() {
    if (this.props.orders) {
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
          <button type="button" onClick={this.handleClick}>
            Checkout
          </button>
        </div>
      )
    } else {
      return <div>Please Wait</div>
    }
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
