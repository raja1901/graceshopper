import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPizzas} from '../store/pizzas'
import {SinglePizza} from './index'
import {createOrder, deleteOrder} from '../store/orders'
import {getActiveCart} from '../store/carts'
import Button from '@material-ui/core/Button'
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
      <ul id="pizza-grid">
        {this.props.pizzas.map(pizza => {
          return (
            <li className="pizza-component" key={pizza.id}>
              <div>
                <SinglePizza pizza={pizza} />
              </div>
              <SimpleSnackbar
                pizza={pizza}
                addOrder={this.props.addOrder}
                cartId={this.props.cartId}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={() => this.handleClick(event, pizza.id)}
                >
                  Add to Cart
                </Button>
              </SimpleSnackbar>
            </li>
          )
        })}
      </ul>
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
