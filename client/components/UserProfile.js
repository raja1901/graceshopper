import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import OrderHistory from './OrderHistory'
import Button from '@material-ui/core/Button'

const UserProfile = props => {
  const {user} = props
  return (
    <div>
      <h1 className="title">Your Account Info</h1>
      <div>
        <div>Name: {user.name}</div>
        <div>Email: {user.email}</div>
        <div>Phone: {user.phone}</div>
        <div>Address: {user.address}</div>
        <div>Favorite: {user.favorite}</div>
        <div>
          <Button color="primary">
            <Link to="/updateprofile">Update Profile</Link>
          </Button>
        </div>
        <br />
      </div>
      <OrderHistory user={user} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserProfile)
