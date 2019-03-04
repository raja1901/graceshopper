import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateUserProfile} from '../store/user'

class UpdateProfile extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({name: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    const updatedUser = {userId: this.props.user.id}
    if (this.state.name) {
      updatedUser.name = this.state.name
    }
    this.props.updateUserProfile(updatedUser)
    this.setState({name: ''})
  }

  render() {
    console.log('Hello! ', this.props)
    return (
      <form onSubmit={this.handlesubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit">Update Your Profile!</button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserProfile: updatedUser => dispatch(updateUserProfile(updatedUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)
