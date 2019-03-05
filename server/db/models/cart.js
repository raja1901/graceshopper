const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  isOrdered: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  total: {
    type: Sequelize.DECIMAL(5, 2)
  }
})

module.exports = Cart
