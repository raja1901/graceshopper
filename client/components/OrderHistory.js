import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrderHistory} from '../store/carts'

class OrderHistory extends Component {
  async componentDidMount() {
    await this.props.fetchOrderHistory(this.props.user.id)
  }
  render() {
    console.log(this.props.orderHistory)
    return (
      <div>
        <h2 id="order history">Order History</h2>
        <table>
          <thead>
            <tr>
              <th>Cart No.</th>
              <th>Cart Items</th>
              <th>Quantity</th>
              <th>Image</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.orderHistory.map(history => {
              return history.orders.map(order => {
                return (
                  <tr className="row" key={order.id}>
                    <td>{history.id}</td>
                    <td>{order.pizza.name}</td>
                    <td>{order.qty}</td>
                    <td>
                      <img className="thumbnail" src={order.pizza.imageUrl} />
                    </td>
                    <td>{order.createdAt.slice(0, 10)}</td>
                  </tr>
                )
              })
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orderHistory: state.carts.orderHistory
})

const mapDispatchToProps = dispatch => ({
  fetchOrderHistory: userId => dispatch(getOrderHistory(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
