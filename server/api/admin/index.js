const router = require('express').Router()
module.exports = router

router.use('/pizzas', require('./pizzas'))
router.use('/users', require('./users'))
