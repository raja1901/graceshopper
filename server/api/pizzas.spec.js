/* global describe beforeEach it */

const {expect} = require('chai')
const app = require('../index')
const request = require('supertest').agent(app)
const db = require('../db')
const Pizza = db.model('pizza')

describe('Pizza routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/pizzas/', () => {
    beforeEach(async () => {
      const newPizza = await Pizza.create({
        name: 'Cheese',
        size: 'Small',
        crust: 'Normal',
        imageUrl: '',
        price: 9.95
      })
    })

    it('gets all pizzas', async () => {
      const res = await request.get('/api/pizzas').expect(200)
    })
  })
})
