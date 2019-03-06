import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPizzas} from '../store/pizzas'
import {SinglePizza} from './index'
import {createOrder, deleteOrder} from '../store/orders'
import {getActiveCart} from '../store/carts'
import SimpleSnackbar from './snackbars'

export class PizzaList extends Component {
  constructor() {
    super()
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchActiveCart()
    this.props.fetchPizzas()
  }

  async handleRemoveClick(event, pizzaId) {
    await this.props.fetchActiveCart()
    this.props.deleteOrder(this.props.cartId, pizzaId)
  }

  render() {
    return (
      <div>
        <div id="pizza-title">
          <h1 className="title">What are you craving?</h1>
        </div>
        <div id="pizza-grid">
          {this.props.pizzas.map(pizza => {
            return (
              <div className="pizza-component" key={pizza.id}>
                <div>
                  <SinglePizza pizza={pizza} />
                </div>
                <SimpleSnackbar
                  pizza={pizza}
                  addOrder={this.props.addOrder}
                  cartId={this.props.cartId}
                />
              </div>
            )
          })}
        </div>
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
