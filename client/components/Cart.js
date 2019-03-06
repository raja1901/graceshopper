import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrders, deleteOrder} from '../store/orders'
import {getActiveCart, checkout} from '../store/carts'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchActiveCart()
    await this.props.fetchOrders(this.props.cart.id)
    this.setState({
      total: +this.props.orders.reduce(
        (acc, currval) => acc + currval.pizza.price * currval.qty,
        0
      )
    })
  }

  async handleClick() {
    await this.props.finalCheckout(this.props.cart.id)
    this.props.history.push('/checkout')
  }

  async handleRemoveClick(event, pizzaId) {
    await this.props.fetchActiveCart()
    await this.props.deleteOrder(this.props.cart.id, pizzaId)
    await this.setState({
      total: +this.props.orders.reduce(
        (acc, currval) => acc + currval.pizza.price * currval.qty,
        0
      )
    })
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
                  <DeleteIcon /> Remove
                </Button>
              </div>
            </div>
          )
        })}
        <br />
        <div>
          <StripeCheckout
            disabled={this.state.total === 0}
            token={this.onToken(this.state.total)}
            stripeKey="pk_test_KN3SFlFyjdQi4B6xdQfwy34w"
            amount={this.state.total * 100}
            name="Top it all off!"
            image="/Grace Topper Checkout.png"
            label="Buy These Pizzas"
            panelLabel="Fork over"
            currency="USD"
            bitcoin
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
