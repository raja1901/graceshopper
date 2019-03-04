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
        {this.props.users.map(user => <div key={user.id}>{user.name}</div>)}
      </div>
    )
  }
}

const mapState = state => {
  return {
    name: state.user.name,
    email: state.user.email,
    users: state.users
  }
}

export default connect(mapState, {getUsers})(Admin)
