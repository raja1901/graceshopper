import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
})

class SimpleSnackbar extends React.Component {
  state = {
    open: false
  }

  handleClick = () => {
    this.props.addOrder(this.props.cartId, this.props.pizza.id)
    this.setState({open: true})
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({open: false})
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={this.handleClick}
        >
          Add {this.props.pizza.name} &ensp;&ensp; <AddShoppingCartIcon />
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.open}
          autoHideDuration={1000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={
            <span id="message-id">
              {this.props.pizza.name} Pizza added to cart
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    )
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleSnackbar)
