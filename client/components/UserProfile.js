import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const UserProfile = props => {
  const {user} = props
  return (
    <div>
      <div>
        <h3>Account Info</h3>
        <div>Name: {user.name}</div>
        <div>Email: {user.email}</div>
        <div>Phone: {user.phone}</div>
        <div>Address: {user.address}</div>
        <div>Favorite: {user.favorite}</div>
        <div>
          <Link to="/updateprofile">Update Profile</Link>
          <br />
          <Link to="/orderhistory">Order History</Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserProfile)
