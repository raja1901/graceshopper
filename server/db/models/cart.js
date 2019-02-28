const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  isOrdered: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Cart
