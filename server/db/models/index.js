const User = require('./user')
const Pizza = require('./pizza')

User.belongsToMany(Pizza, {through: 'order'})
Pizza.belongsToMany(User, {through: 'order'})

module.exports = {
  User,
  Pizza
}
