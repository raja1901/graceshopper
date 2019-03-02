import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPizzas} from '../store/pizzas'
import {SinglePizza} from './index'
import {createOrder, deleteOrder} from '../store/orders'
import {getActiveCart} from '../store/carts'
// import {withRouter} from 'react-router-dom'

class PizzaList extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchPizzas()
  }

  async handleClick(event, pizzaId) {
    await this.props.fetchActiveCart()
    this.props.addOrder(this.props.cartId, pizzaId)
  }

  async handleRemoveClick(event, pizzaId) {
    await this.props.fetchActiveCart()
    this.props.deleteOrder(this.props.cartId, pizzaId)
  }

  render() {
    return (
      <div>
        {this.props.pizzas.map(pizza => {
          return (
            <div key={pizza.id}>
              <SinglePizza pizza={pizza} />
              <button
                type="button"
                onClick={() => this.handleClick(event, pizza.id)}
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={() => this.handleRemoveClick(event, pizza.id)}
              >
                Remove from Cart
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pizzas: state.pizzas.allPizzas,
    cartId: state.carts.activeCart.id
  }
}

const mapDispatchToProps = dispatch => ({
  addOrder: (cartId, pizzaId) => dispatch(createOrder(cartId, pizzaId)),
  deleteOrder: (cartId, pizzaId) => dispatch(deleteOrder(cartId, pizzaId)),
  fetchPizzas: () => dispatch(getPizzas()),
  fetchActiveCart: () => dispatch(getActiveCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(PizzaList)
