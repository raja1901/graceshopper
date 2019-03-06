import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrders, deleteOrder} from '../store/orders'
import {getActiveCart, checkout} from '../store/carts'
import {SinglePizza} from './index'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'

class GuestCart extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchActiveCart()
    this.props.fetchOrders(this.props.cart.id)
  }

  handleClick() {
    this.props.history.push('/login')
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
      <div id="checkout">
        <h1 className="title">Your Cart</h1>
        {this.props.orders.map((order, idx) => {
          return (
            <div className="single-pizza" key={idx}>
              <div className="single-pizza-div">
                <img className="pizza-img-cart" src={order.pizza.imageUrl} />
              </div>
              <div>
                <p>
                  <strong>{order.pizza.name}</strong>
                  <br />
                  Quantity: {order.qty}
                </p>
                <Button
                  color="secondary"
                  size="small"
                  onClick={() => this.handleRemoveClick(event, order.pizzaId)}
                >
                  <DeleteIcon /> {order.pizza.name}
                </Button>
              </div>
            </div>
          )
        })}
        <br />
        <div>
          <Button
            variant="contained"
            // color="primary"
            onClick={this.handleClick}
          >
            Please login to checkout
          </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(GuestCart)
