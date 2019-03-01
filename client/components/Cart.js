import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store/orders'
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

  handleClick(event, cartId) {
    this.props.finalCheckout(event, cartId)
  }

  render() {
    console.log(this.props.orders)
    if (this.props.orders) {
      return (
        <div>
          {this.props.orders.map((order, idx) => {
            return (
              <div key={idx}>
                <SinglePizza pizza={order.pizza} />
                <h2>Quantity: {order.qty}</h2>
              </div>
            )
          })}
          <button type="button" onClick={() => this.handleClick(event, cartId)}>
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
  finalCheckout: cartId => dispatch(checkout(cartId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
