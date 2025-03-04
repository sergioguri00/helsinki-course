const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: "Blog Prueba",
        author: "Perico el de los Palotes",
        url: "https://pericoesunmaquina.com",
        likes: 24
    },
    {
        title: "Teo va al parque",
        author: "No se jeje",
        url: "http://teoysusaventuras.org",
        likes: 0
    },
    {
        title: "Paco va al Zoo",
        author: "Paco Paquito",
        url: "http://pacopaquito.com",
        likes: 3
    }
]

beforeEach(async () => {
    await blog.deleteMany({})
    let blogObject = new blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new blog(initialBlogs[2])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)
})

test('id instead of _id', async () => {
  const response = await api.get('/api/blogs')
    assert.strictEqual(response.status, 200)
    assert.match(response.type, /application\/json/)
    assert.ok(response.body[0].id, 'id should be defined')
    assert.ok(!response.body[0]._id, '_id should not be defined')
}) 

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Matti Luukkainen',
    url: 'https://fullstackopen.com/',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)

  assert(titles.includes('async/await simplifies making async calls'))
})

test('likes is 0 if is not in the request', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Matti Luukkainen',
    url: 'https://fullstackopen.com/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const newBlogLikes = response.body.find(blog => blog.title === 'async/await simplifies making async calls').likes
  
  assert.strictEqual(newBlogLikes, 0)
})

test('endpoint throws 400 Bad Request if title or url are missing', async () => {
  const newBlogWithoutURL = {
    author: "Javier Martinez",
    title: "Blog Prueba",
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutURL)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const newBlogWithoutTitle = {
    author: "Javier Martinez",
    url: 'https://fullstackopen.com/',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('deleting a blog with provided id', async () => {
  const response = await api.get('/api/blogs')
  const id = response.body[0].id
  await api
    .delete(`/api/blogs/${id}`)
    .expect(204)
})

test('editing likes with provided id', async () => {
  const response = await api.get('/api/blogs')
  const id = response.body[0].id
  const newLikes = {
    likes: 100
  }
  await api
    .put(`/api/blogs/${id}`)
    .send(newLikes)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .then(response => {
      assert.strictEqual(response.body.likes, 100)
    })
})

after(async () => {
  await mongoose.connection.close()
})
