const router = require('express').Router()
const {Cart} = require('../db/models')

router.get('/', async (req, res, next) => {
  const [cart] = await Cart.findAll({
    where: {
      isOrdered: false,
      userId: 1
    }
  })
  res.json(cart)
})

router.post('/', async (req, res, next) => {
  try {
    const userId = 1
    const cart = await Cart.create({userId})
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

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
