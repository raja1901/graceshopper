const router = require('express').Router()
const {User} = require('../../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const {email, password, isAdmin} = req.body
      const newUser = await User.create({
        email,
        password,
        isAdmin
      })
      res.json(newUser)
    } else {
      res.status('404').send('Nice try!')
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const {userId} = req.params
      const removedUser = await User.destroy({
        where: {
          id: userId
        }
      })
      res.json(removedUser)
    } else {
      res.status('404').send('Nice try!')
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const {
        name,
        email,
        address,
        phone,
        favorite,
        password,
        isAdmin
      } = req.body
      const [numOfUsers, updatedUser] = await User.update(
        {
          name,
          email,
          address,
          phone,
          favorite,
          password,
          isAdmin
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
    } else {
      res.status('404').send('Nice try!')
    }
  } catch (err) {
    next(err)
  }
})
