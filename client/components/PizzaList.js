import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPizzas} from '../store/pizzas'
import {SinglePizza} from './index'
// import {withRouter} from 'react-router-dom'

class PizzaList extends Component {
  componentDidMount() {
    this.props.getPizzas()
  }
  render() {
    return (
      <div>
        {this.props.pizzas.map(pizza => {
          return <SinglePizza key={pizza.id} pizza={pizza} />
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
