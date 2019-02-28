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

module.exports = router
