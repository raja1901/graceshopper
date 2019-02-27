const router = require('express').Router()
const {Pizza} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const pizzas = await Pizza.findAll()
    res.json(pizzas)
  } catch (err) {
    next(err)
  }
})

module.exports = router
