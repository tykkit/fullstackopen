import { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    createBlog.mutate(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            data-testid="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="title of the blog"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control
            data-testid="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="author of the blog"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control
            data-testid="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="url to the blog"
          />
        </Form.Group>
        <Button type="submit">create</Button>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.object.isRequired,
}

export default BlogForm
