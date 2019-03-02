const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// AUTHENTICATION FUNCTION
function isAuthenticated(req, res, next) {
  if (req.user) {
    return next()
  } else {
    res.redirect('/')
  }
}

router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
