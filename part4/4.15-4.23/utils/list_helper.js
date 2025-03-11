var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (favorite, blog) => {
    return favorite.likes > blog.likes ? favorite : blog
  }
  if (!blogs || blogs.length === 0) return null
  const favorite = blogs.reduce(reducer, { likes: -1 })
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return null;
  const blogCounts = _.mapValues(_.groupBy(blogs, "author"), (b) => b.length);
  const topAuthor = _.maxBy(_.toPairs(blogCounts), ([, count]) => count);
  return {
    author: topAuthor[0],
    blogs: topAuthor[1],
  };
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) return null;
  const blogCounts = _.mapValues(_.groupBy(blogs, "author"), (b) => _.sumBy(b, "likes"));
  const mostLikedAuthor = _.maxBy(_.toPairs(blogCounts), ([, count]) => count);
  return {
    author: mostLikedAuthor[0],
    likes: mostLikedAuthor[1],
  };
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}