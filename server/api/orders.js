const router = require('express').Router()
const {Order, Pizza} = require('../db/models')

//getting all order items in a cart
router.get('/:cartId', async (req, res, next) => {
  try {
    const cartId = req.params.cartId
    if (req.session.cart && req.user) {
      await Order.mergeCarts(cartId, req.session.cart.id)
      req.session.cart = {}
    }
    const orders = await Order.findAll({
      include: [{model: Pizza}],
      where: {cartId}
    })

    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//addTo cart - /api/orders/cartId
router.post('/:cartId', async (req, res, next) => {
  try {
    //const userId = req.user.id
    const cartId = req.params.cartId
    const pizzaId = req.body.pizzaId

    const temp = await Order.findOne({where: {cartId, pizzaId}})
    if (temp) {
      temp.qty = temp.qty + 1
      temp.save()
      res.json(temp)
    } else {
      const item = await Order.create({
        qty: 1,
        pizzaId,
        //userId,
        cartId
      })
      res.json(item)
    }
  } catch (err) {
    next(err)
  }
})

// //removefromCart
router.delete('/:cartId', async (req, res, next) => {
  try {
    // const userId = req.user.id
    const cartId = req.params.cartId
    const pizzaId = req.body.pizzaId

    const temp = await Order.findOne({where: {cartId, pizzaId}})
    if (temp.qty > 1) {
      temp.qty = temp.qty - 1
      temp.save()
      res.json(temp)
    } else {
      await Order.destroy({where: {id: temp.id}})
      res.status(202).end()
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
