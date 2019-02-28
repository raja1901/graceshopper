import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store/orders'

import {getActiveCart} from '../store/carts'

import {SinglePizza} from './index'

class Cart extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.activeCart.id)
  }
  render() {
    return (
      <div>
        {this.props.orders.map(order => {
          return (
            <div key={order.id}>
              <SinglePizza pizza={order.pizza} />
              <h2>Quantity: {order.qty}</h2>
            </div>
          )
        })}
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
  getActiveCart: () => dispatch(getCartId())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
