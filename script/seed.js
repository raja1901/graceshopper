'use strict'

const db = require('../server/db')
const {User, Pizza, Order, Cart} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      name: 'cody',
      // address: "aman's house",
      // phone: '1234567890',
      // favorite: 'chicken',
      email: 'cody@email.com',
      password: '123'
    })
    // User.create({email: 'murphy@email.com', password: '123'})
  ])

  const pizzas = await Promise.all([
    Pizza.create({
      name: 'Pepperoni',
      size: 'Small',
      crust: 'Normal',
      imageUrl: 'https://www.cicis.com/media/1139/pizza_trad_pepperoni_sm.png',
      price: 10.95
    }),
    Pizza.create({
      name: 'Hawaiian',
      size: 'Small',
      crust: 'Normal',
      imageUrl:
        'https://www.cicis.com/media/1158/pizza_adven_hampineapple_sm.png',
      price: 10.95
    }),
    Pizza.create({
      name: 'Cheese',
      size: 'Small',
      crust: 'Normal',
      imageUrl: 'https://www.cicis.com/media/1177/pizza_trad_cheese_sm.png',
      price: 9.95
    }),
    Pizza.create({
      name: 'Supreme',
      size: 'Medium',
      crust: 'Normal',
      imageUrl: 'https://www.cicis.com/media/1172/pizza_trad_supreme_sm.png',
      price: 6.95
    }),
    Pizza.create({
      name: 'Meat Lovers',
      size: 'Medium',
      crust: 'Normal',
      imageUrl: 'https://www.cicis.com/media/1175/pizza_trad_meateater_sm.png',
      price: 11.95
    }),
    Pizza.create({
      name: 'Mac & Cheese',
      size: 'Small',
      crust: 'Normal',
      imageUrl: 'https://www.cicis.com/media/1160/pizza_adven_maccheese_sm.png',
      price: 9.95
    }),
    Pizza.create({
      name: 'Vegetarian',
      size: 'Small',
      crust: 'Normal',
      imageUrl: 'https://www.cicis.com/media/1173/pizza_trad_veggie_sm.png',
      price: 6.95
    }),
    Pizza.create({
      name: 'Bianca',
      size: 'Small',
      crust: 'Normal',
      imageUrl: 'https://www.cicis.com/media/1173/pizza_trad_veggie_sm.png',
      price: 6.95
    }),
    Cart.create({
      isOrdered: false,
      userId: 1
    }),
    Cart.create({
      isOrdered: true,
      userId: 1
    }),
    Order.create({
      qty: 5,
      pizzaId: 1,
      userId: 1,
      cartId: 1
    }),
    Order.create({
      qty: 3,
      pizzaId: 2,
      userId: 1,
      cartId: 1
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
