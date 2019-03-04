import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUsers} from '../store/admin'

class Admin extends Component {
  componentDidMount() {
    this.props.getUsers()
  }
  render() {
    return (
      <div>
        <h1>Welcome, {this.props.name}!</h1>
        <h3>{this.props.email}</h3>
        <h4>Here is a list of users!</h4>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Admin?</th>
            </tr>
            {this.props.users.map(user => (
              <tr key={user.id}>
                <td> {user.name}</td>
                <td> {user.email}</td>
                <td> {`${user.isAdmin}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h4>Here is a list of Pizzas!</h4>

        <div>
          {this.props.pizzas.map(pizza => <p key={pizza.id}>{pizza.name}</p>)}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    name: state.user.name,
    email: state.user.email,
    users: state.users,
    pizzas: state.pizzas.allPizzas
  }
}

export default connect(mapState, {getUsers})(Admin)
