const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  qty: {
    type: Sequelize.INTEGER
  }
})

Order.mergeCarts = async (userCartId, guestCartId) => {
  const guestOrders = await Order.findAll({
    where: {
      cartId: guestCartId
    }
  })
  const userOrders = await Order.findAll({
    where: {
      cartId: userCartId
    }
  })

  const merge = () => {
    guestOrders.forEach(async gorder => {
      try {
        const cartId = userCartId
        const pizzaId = gorder.pizzaId

        const temp = await Order.findOne({where: {cartId, pizzaId}})
        if (temp) {
          temp.qty = temp.qty + gorder.qty
          temp.save()
        } else {
          await Order.create({
            qty: gorder.qty,
            pizzaId,
            cartId
          })
        }
      } catch (err) {
        console.error(err.message)
      }
    })
  }
  merge()
}

module.exports = Order

// if (userOrders.includes(gorder.pizzaId)) {
//   uorder.qty += gorder.qty
//   uorder.save()
// } else {
//   console.log('here')
//   await temp.update({cartId: userCartId})
//   temp.save()
// }
