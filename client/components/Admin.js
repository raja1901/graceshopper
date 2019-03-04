import React, {Component} from 'react'
import {connect} from 'react-redux'

class Admin extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    //fetch users
  }
  render() {
    return (
      <div>
        <h1>Welcome, {this.props.name}!</h1>
        <h3>{this.props.email}</h3>
        {/* {Render users here in .map} */}
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

export default connect(mapState)(Admin)
