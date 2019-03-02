const User = require('./user')
const Pizza = require('./pizza')
const Order = require('./order')
const Cart = require('./cart')

Pizza.hasMany(Order)
Order.belongsTo(Pizza)

Cart.hasMany(Order)
Order.belongsTo(Cart)

User.hasMany(Cart)
Cart.belongsTo(User)

module.exports = {
  User,
  Pizza,
  Order,
  Cart
}
