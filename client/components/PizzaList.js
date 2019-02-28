import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPizzas} from '../store/pizzas'
import {SinglePizza} from './index'
import {createOrder} from '../store/orders'
// import {withRouter} from 'react-router-dom'

class PizzaList extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchPizzas()
  }

  handleClick(event) {
    this.props.addOrder(event.target.value)
  }

  render() {
    return (
      <div>
        {this.props.pizzas.map(pizza => {
          return (
            <div key={pizza.id}>
              <SinglePizza pizza={pizza} />
              <button onClick={this.handleClick}>Add to Cart</button>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pizzas: state.pizzas.allPizzas
  }
}

const mapDispatchToProps = dispatch => ({
  addOrder: pizza => dispatch(createOrder(pizza)),
  fetchPizzas: () => dispatch(getPizzas())
})

export default connect(mapStateToProps, mapDispatchToProps)(PizzaList)
