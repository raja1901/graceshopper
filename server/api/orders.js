const router = require('express').Router()
const {Order, Pizza} = require('../db/models')

router.get('/:cartId', async (req, res, next) => {
  try {
    const cartId = req.params.cartId
    const orders = await Order.findAll({
      include: [{model: Pizza}],
      where: {cartId}
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//addTo cart
//need to test user part on front end
router.post('/:cartId', async (req, res, next) => {
  try {
    const userId = 1
    const cartId = req.params.cartId
    const pizzaId = req.body.pizzaId

    const temp = await Order.findOne({where: {userId, cartId, pizzaId}})
    if (temp) {
      temp.qty = temp.qty + 1
      temp.save()
      res.json(temp)
    } else {
      const item = await Order.create({
        qty: 1,
        pizzaId,
        userId,
        cartId
      })
      res.json(item)
    }
  } catch (err) {
    next(err)
  }
})

// //removefromCart
// router.post('/remove', async (req, res, next) => {
//   try {
//     const pizzas = await Cart.findAll()
//     res.json(pizzas)
//   } catch (err) {
//     next(err)
//   }
// })

module.exports = router
