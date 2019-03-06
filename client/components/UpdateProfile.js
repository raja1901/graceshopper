import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateUserProfile} from '../store/user'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

class UpdateProfile extends Component {
  constructor(props) {
    super(props)
    const {id, name, email, phone, address, favorite} = props.user
    this.state = {id, name, email, phone, address, favorite}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault()
    const updatedUser = this.state
    await this.props.updateUserProfile(updatedUser)
    this.props.history.push('/userprofile')
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1 className="title">Update your account</h1>
        <TextField
          required
          id="standard-name"
          label="Name"
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <br />
        <TextField
          required
          id="standard-name"
          label="Email"
          value={this.state.email}
          onChange={this.handleChange('email')}
          margin="normal"
        />
        <br />
        <TextField
          id="standard-name"
          label="Phone"
          value={this.state.phone}
          onChange={this.handleChange('phone')}
          margin="normal"
        />
        <br />
        <TextField
          id="standard-name"
          label="Address"
          value={this.state.address}
          onChange={this.handleChange('address')}
          margin="normal"
        />
        <br />
        <TextField
          id="standard-name"
          label="Favorite"
          value={this.state.favorite}
          onChange={this.handleChange('favorite')}
          margin="normal"
        />
        <br />
        <Button type="submit" variant="contained" color="primary" size="small">
          Update Your Profile!
        </Button>
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
