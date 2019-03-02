const router = require('express').Router()
const {Pizza} = require('../../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const {name, size, crust, imageUrl, price} = req.body
      const newPizza = await Pizza.create({
        name,
        size,
        crust,
        imageUrl,
        price
      })
      res.json(newPizza)
    } else {
      res.status('404').send('Nice try!')
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:pizzaId', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const {pizzaId} = req.params
      const removedPizza = await Pizza.destroy({
        where: {
          id: pizzaId
        }
      })
      res.json(removedPizza)
    } else {
      res.status('404').send('Nice try!')
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:pizzaId', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const {name, imageUrl, price} = req.body
      const [numOfPizzas, updatedPizza] = await Pizza.update(
        {
          name,
          imageUrl,
          price
        },
        {
          where: {
            id: req.params.pizzaId
          },
          returning: true,
          plain: true
        }
      )
      res.json(updatedPizza)
    } else {
      res.status('404').send('Nice try!')
    }
  } catch (err) {
    next(err)
  }
})
