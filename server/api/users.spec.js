/* global describe beforeEach it */

const {expect} = require('chai')
const app = require('../index')
const request = require('supertest').agent(app)
const db = require('../db')
const User = db.model('user')

let cody

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(async () => {
      cody = await User.create({
        name: 'cody',
        email: codysEmail,
        address: "aman's backyard",
        phone: '1230984375',
        password: '123',
        isAdmin: true
      })
    })

    it('GET /api/users', async () => {
      const res = await request.get('/api/users').expect(401)
    })

    it('should get users for a logged in admin', async () => {
      await request
        .post('/auth/login')
        .send({email: codysEmail, password: '123'})
        .expect(200)
      const res = await request.get('/api/users').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
