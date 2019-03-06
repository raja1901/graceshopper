const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// AUTHENTICATION FUNCTION
function isAuthenticated(req, res, next) {
  if (req.user) {
    if (req.user.isAdmin) {
      return next()
    }
  } else {
    res.sendStatus(401)
  }
}

router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'name', 'email', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const {name, email, phone, address, favorite} = req.body
    const [numOfUsers, updatedUser] = await User.update(
      {
        name,
        email,
        phone,
        address,
        favorite
      },
      {
        where: {
          id: req.params.userId
        },
        returning: true,
        plain: true
      }
    )
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})
