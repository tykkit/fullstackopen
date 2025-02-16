import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import Message from './components/Message'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'
import Login from './components/Login'

import { useNotificationDispatch } from './reducers/NotificationContext'
import { useLoginDispatch, useLoginValue } from './reducers/LoginContext'
import {
  Routes, Route, Link,
  useMatch
} from 'react-router-dom'
import BlogList from './components/BlogList'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const loginDispatch = useLoginDispatch()
  const user = useLoginValue()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log('loggedUserJSON', loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      loginDispatch({
        type: 'LOGIN',
        payload: user
      })
      console.log(useLoginValue)
      blogService.setToken(user.token)
      userService.setToken(user.token)
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    loginDispatch({ type: 'LOGOUT' })
  }

  const addBlogMutation = useMutation({
    mutationFn: async (mutatedBlog) => {
      await blogService.create(mutatedBlog)
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: `a new blog ${mutatedBlog.title} by ${mutatedBlog.author} added`,
          isError: false
        }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: () => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: 'Blog addition failed',
          isError: true
        }
      })
    }
  })

  const addLikeMutation = useMutation({
    mutationFn: async (mutatedBlog) => {
      await blogService.put({ ...mutatedBlog, likes: mutatedBlog.likes + 1 })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const removeBlogMutation = useMutation({
    mutationFn: async (toBeDeleted) => {
      await blogService.remove(toBeDeleted)
    },
    onSuccess: () => {
      console.log('blog successfully removed')
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const addCommentMutation = useMutation({
    mutationFn: async (toBeAdded) => {
      await blogService.createComment(toBeAdded.blog, toBeAdded)
    },
    onSuccess: () => {
      console.log('comment added to server')
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const userQuery = useQuery({
    queryKey: ['users'],
    queryFn: async () => await userService.getAll(),
    enabled: !!user
  })

  const blogQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => await blogService.getAll(),
    enabled: !!user
  })

  const blogs = blogQuery.data
  const users = userQuery.data

  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

  if (blogQuery.isLoading || userQuery.isLoading) {
    return <div>loading data...</div>
  }

  if (blogQuery.isError || userQuery.isError) {
    return <div>not available due to server error</div>
  }

  if (!user) {
    return (
      <div>
        <h2>Log in to app</h2>
        <Message />
        <Login/>
      </div>
    )
  }

  const userToShow = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogToShow = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  return (
    <div>
      <Menu logOut={handleLogout} currentUser={user}/>
      <Message />
      <h1>Blogs by tykkit</h1>
      <Routes>
        <Route path='/blogs/:id' element={
          <Blog
            blog={blogToShow}
            likeHandler={addLikeMutation}
            removeHandler={removeBlogMutation}
            currentUser={user}
            commentHandler={addCommentMutation}
          />}
        />
        <Route path='/users/:id' element={<User user={userToShow} />} />
        <Route path='/users' element={<Users users={users} />} />
        <Route path='/blogs' element={
          <BlogList
            blogs={blogs}
            addBlog={addBlogMutation}
            removeBlog={removeBlogMutation}
            addLike={addLikeMutation}
          />}
        />
        <Route path='/' element={
          <BlogList
            blogs={blogs}
            addBlog={addBlogMutation}
            removeBlog={removeBlogMutation}
            addLike={addLikeMutation}
          />}
        />
      </Routes>
    </div>
  )
}

export default App
