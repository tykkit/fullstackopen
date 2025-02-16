import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'
import { useLoginDispatch, useLoginValue } from '../reducers/LoginContext'
import { useNotificationDispatch } from '../reducers/NotificationContext'

const Login = () => {
  const loginDispatch = useLoginDispatch()
  const dispatch = useNotificationDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const tryLogin = async (username, password) => {
    console.log('handle login')
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      console.log(user)
      console.log(useLoginValue)
      blogService.setToken(user.token)
      userService.setToken(user.token)
      loginDispatch({
        type: 'LOGIN',
        payload: user
      })
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: `Welcome ${user.name}!`,
          isError: false
        }
      })
    } catch (error) {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: 'Wrong username or password',
          isError: true
        }
      })
    }
  }

  const onLogin = (event) => {
    event.preventDefault()
    tryLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <Form onSubmit={onLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </div>
  )
}

export default Login