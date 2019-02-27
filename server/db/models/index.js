const User = require('./user')
const Pizza = require('./pizza')

Pizza.belongsToMany(User, {through: 'order'})
User.belongsToMany(Pizza, {through: 'order'})

module.exports = {
  User
}
