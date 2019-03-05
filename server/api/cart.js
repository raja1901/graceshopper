/* eslint-disable no-lonely-if */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

const router = require('express').Router()
const {Cart, Order, Pizza} = require('../db/models')
const stripe = require('stripe')(stripeSecretKey)
const {cyan, red} = require('chalk')

// getting users cart or create it for logged in user
router.get('/', async (req, res, next) => {
  if (req.user) {
    const [cart] = await Cart.findOrCreate({
      where: {
        isOrdered: false,
        userId: req.user.id
      }
    })
    res.json(cart)
  } else {
    if (req.session.cart) {
      // if req.session exists - check session for cart and response cart
      res.json(req.session.cart)
    } else {
      // if not create new cart in session and response cart.
      const newCart = await Cart.create()
      console.log('NEW CART ', newCart)
      req.session.cart = newCart
      res.json(newCart)
    }
  }
})

// create new cart for user
router.post('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const cart = await Cart.create({userId})
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

//toggling cart to "ordered"
router.put('/:cartId/checkout', async (req, res, next) => {
  try {
    const [numberOfAffectedRows, affectedRows] = await Cart.update(
      {
        isOrdered: true
      },
      {
        where: {isOrdered: false, id: req.params.cartId},
        returning: true,
        plain: true
      }
    )
    res.status(204).send({})
  } catch (error) {
    next(error)
  }
})

router.post('/:cartId/checkout', (req, res, next) => {
  console.log('$$$$$$$$$$ REQ.BODY', req.body)
  try {
    const {amount, token} = req.body
    const charge = stripe.charges.create(
      {
        amount,
        source: token
      },
      function(err, charge) {
        if (err && err.type === 'StripeCardError') {
          console.log(red('Your card was declined!'))
        }
      }
    )
    console.log(cyan('Your payment was successful'))
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

// send all carts for order history
router.get('/:userId', async (req, res, next) => {
  const userId = req.params.userId
  if (req.user) {
    const orderHistory = await Cart.findAll({
      include: [{model: Order, include: [{model: Pizza}]}],
      where: {
        isOrdered: true,
        userId
      }
    })
    res.json(orderHistory)
  } else {
    res.redirect('/')
  }
})

module.exports = router
