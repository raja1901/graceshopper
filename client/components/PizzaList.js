import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPizzas} from '../store/pizzas'

class PizzaList extends Component {
  componentDidMount() {
    this.props.getPizzas()
  }
  render() {
    return (
      <div>
        {this.props.pizzas.map(pizza => {
          return <div>PIZZA HERE</div>
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

export default connect(mapStateToProps, {getPizzas})(PizzaList)
