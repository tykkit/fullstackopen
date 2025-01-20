const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are six blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 6)
})

test('blogs have the correct id field format', async () => {
  const response = await api.get('/api/blogs')

  assert(!response.body[0]._id)
})

test('a valid blog is successfully added to the db', async () => {
  const newBlog = {
    title: 'tykki t chronicles',
    author: 'tykki T',
    url: "abc.xyz/9999",
    likes: 7
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  const titles = response.body.map(b => b.title)

  assert(titles.includes('tykki t chronicles'))
})

test('if no like amount is set on new blog post, likes default to zero', async () => {
  const newBlog = {
    title: 'tykki t chronicles',
    author: 'tykki T',
    url: "abc.xyz/9999"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  const titles = response.body.map(b => b.title)

  assert(titles.includes('tykki t chronicles'))

  assert.strictEqual(response.body[6].likes, 0)
})

test('if blog does not have defined title, returns 400', async () => {
  const noTitleBlog = {
    author: 'tykki T',
    url: "abc.xyz/9999"
  }

  await api
    .post('/api/blogs')
    .send(noTitleBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('if blog does not have defined author, returns 400', async () => {
  const noAuthorBlog = {
    title: 'tykki t chronicles',
    url: "abc.xyz/9999"
  }

  await api
    .post('/api/blogs')
    .send(noAuthorBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blog deletion is successful when blog is in db', async () => {
  const testId = "5a422bc61b54a676234d17fc"

  await api
    .delete(`/api/blogs/${testId}`)
    .expect(204)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length - 1)
})

test('blog like amount change is successful when the blog is in db', async () => {
  const testId = "5a422bc61b54a676234d17fc"

  const testLikes = {
    likes: 8
  }

  await api
    .put(`/api/blogs/${testId}`)
    .send(testLikes)
    .expect(200)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body[5].likes, 8)
})

after(async () => {
  await mongoose.connection.close()
})