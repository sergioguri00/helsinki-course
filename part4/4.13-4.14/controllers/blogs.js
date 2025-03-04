const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
    response.json(blogs)
    })
})
  
blogsRouter.post('/', (request, response) => {
  let blog = new Blog(request.body)

  if (!blog.likes) blog.likes = 0
  if (!blog.title || !blog.url) return response.status(400).json({ error: 'title or url missing' })

  blog
    .save()
    .then(result => {
    response.status(201).json(result)
    })
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog
    .findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter