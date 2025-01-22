const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: "6790c2a86a201f2dd686c07f",
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      user: "6790c2a86a201f2dd686c07f",
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      user: "6790c2a86a201f2dd686c07f",
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      user: "6790c2a86a201f2dd686c07f",
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      user: "6790c2a86a201f2dd686c07f",
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      user: "6790c2a86a201f2dd686c07f",
      __v: 0
    }
  ]

const initialUsers = [
  {
    username: 'tykotttti',
    name: 'tyko',
    password: '123455664',
    _id: "6790c2a86a201f2dd686c07f"
  },
  {
    username: 'tykosan',
    name: 'tykonen',
    password: '12312312313123123'
  },
  {
    username: 'testertsetser',
    name: 'testerbusyman',
    password: '1231231'
  }
]

const blogsInDatabase = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDatabase = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const testAuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InR5a290dHR0aSIsImlkIjoiNjc5MGMyYTg2YTIwMWYyZGQ2ODZjMDdmIiwiaWF0IjoxNzM3NTY0Mzc4fQ.Y_spJUUEXifo_tQiMbuni_uZM8fLg-oGH0qarcma_4o'

module.exports = {
    initialBlogs, blogsInDatabase, initialUsers, testAuthToken, usersInDatabase
}