import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/AddBlog'
import ErrorMessage from './components/ErrorMessage'
import Message from './components/Message'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url
      }

      console.log(blogObject)
      const addedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(addedBlog))
      console.log(addedBlog)
      setMessage(`a new blog ${addedBlog.title} by ${addedBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Blog addition failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
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
      <h2>create new</h2>
      <BlogForm 
        title={title} 
        author={author} 
        url={url}
        titleSetter={setTitle} 
        authorSetter={setAuthor} 
        urlSetter={setUrl} 
        addBlog={addBlog} 
      />
      <div>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App