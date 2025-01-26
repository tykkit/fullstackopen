import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/AddBlog'
import ErrorMessage from './components/ErrorMessage'
import Message from './components/Message'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      console.log(user)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    try {
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          blogService.getAll().then(blogs => setBlogs(blogs))
          setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    } catch (error) {
      console.log(error)
      setErrorMessage('Blog addition failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLike = (blogObject) => {
    try {
      console.log(blogObject)
      const modifiedBlog = {
        ...blogObject,
        likes: blogObject.likes + 1
      }
      console.log(modifiedBlog)
      blogService
        .put(modifiedBlog)
        .then(returnedBlog => {
          console.log(returnedBlog)
          setBlogs(blogs.map(blog => {
            if (blog.id === modifiedBlog.id) {
              return modifiedBlog
            } else {
              return blog
            }
          }))
        })
    } catch (error) {
      console.log(error)
    }
  }

  const removeBlog = (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      try {
        const idToRemove = blogObject.id
        blogService
          .remove(idToRemove)
          .then(returnedId => {
            setBlogs(blogs.filter(blog => blog.id !== idToRemove))
            console.log(`Removed ${blogObject.title}`)
          })
      } catch (error) {
        console.log(error)
      }
    }
  }

  blogs.sort((first, second) => second.likes - first.likes)

  if (user === null) {
    return (
      <div>
        <h2>Log in to app</h2>
        <ErrorMessage message={errorMessage}/>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <ErrorMessage message={errorMessage}/>
      <Message message={message}/>
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </div>
      <Togglable buttonLabel="new blog">
        <h2>create new</h2>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} likeHandler={addLike} removeHandler={removeBlog} currentUser={user}/>
        )}
      </div>
    </div>
  )
}

export default App