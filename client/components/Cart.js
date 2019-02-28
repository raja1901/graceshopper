import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store/orders'
import {SinglePizza} from './index'

class Cart extends Component {
  componentDidMount() {
    this.props.fetchOrders()
  }
  render() {
    return (
      <div>
        {this.props.orders.map(order => {
          return <SinglePizza key={order.id} pizza={order} />
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders
})

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(getOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
