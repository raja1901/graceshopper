const Sequelize = require('sequelize')
const db = require('../db')

const Pizza = db.define('pizza', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  size: {
    type: Sequelize.ENUM('Small', 'Medium', 'Large', 'X-Large'),
    defaultValue: 'Medium'
  },
  crust: {
    type: Sequelize.ENUM('Normal', 'Thin', 'Stuffed', 'Handmade Pan'),
    defaultValue: 'Normal'
  },
  imageUrl: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL(4, 2)
  }
})

module.exports = Pizza
