/* eslint-disable no-lonely-if */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const router = require('express').Router()
const {Cart} = require('../db/models')

const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

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
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
