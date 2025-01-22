const { test, after, beforeEach, describe } = require('node:test')
const User = require('../models/user')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const helper = require('./test_helper')

const api = supertest(app)

describe('Test user addition', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  test('A proper user can be added to database', async () => {
    const newUser = {
      username: 'ottoooo',
      name: 'OTTO',
      password: '2323232'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDatabase()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)
  })

  test('New user with no name can be added', async () => {
    const newUser = {
      username: 'ottoooo',
      password: '2323232'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDatabase()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)
  })

  describe('Test validation measures', () => {
    test('User already in the database cannot be added', async() => {
      const newUser = {
        username: 'tykosan',
        name: 'tykonen',
        password: '12312312313123123'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const usersAtEnd = await helper.usersInDatabase()
      assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
    })

    test('User with no password cannot be added', async () => {
      const newUser = {
        username: 'ottoooo',
        name: 'OTTO'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const usersAtEnd = await helper.usersInDatabase()
      assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
    })

    test('User with no username cannot be added', async () => {
      const newUser = {
        name: 'OTTO',
        password: '2323232'
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
  
      const usersAtEnd = await helper.usersInDatabase()
      assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
    })

    test('Password that is not long enough causes 400', async () => {
      const newUser = {
        username: 'ottoooo',
        name: 'OTTO',
        password: '23'
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
  
      const usersAtEnd = await helper.usersInDatabase()
      assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
    })
  })  
})

after(async () => {
  await mongoose.connection.close()
})