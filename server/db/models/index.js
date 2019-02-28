const User = require('./user')
const Pizza = require('./pizza')
const Order = require('./order')
const Cart = require('./cart')

Order.belongsTo(Pizza)
Pizza.hasMany(Order)

User.hasMany(Order)
Order.belongsTo(User)

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
