import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateUserProfile} from '../store/user'

class UpdateProfile extends Component {
  constructor(props) {
    super(props)
    const {id, name, email, phone, address, favorite} = props.user
    this.state = {id, name, email, phone, address, favorite}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const updatedUser = this.state

    console.log('updatedUser ', updatedUser)
    this.props.updateUserProfile(updatedUser)
    // this.setState({name: ''})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={this.state.phone}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={this.state.address}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Favorite:
          <input
            type="text"
            name="favorite"
            value={this.state.favorite}
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
