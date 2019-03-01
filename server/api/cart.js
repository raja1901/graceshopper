const router = require('express').Router()
const {Cart} = require('../db/models')

// getting users cart or create it for logged in user
router.get('/', async (req, res, next) => {
  const [cart] = await Cart.findOrCreate({
    where: {
      isOrdered: false,
      userId: req.user.id
    }
  })
  res.json(cart)
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
