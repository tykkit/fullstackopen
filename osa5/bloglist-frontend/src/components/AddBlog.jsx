import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            data-testid='title'
            value={title}
            onChange={event => setTitle(event.target.value)}
            placeholder='title of the blog'/>
        </div>
        <div>
          author:
          <input
            data-testid='author'
            value={author}
            onChange={event => setAuthor(event.target.value)}
            placeholder='author of the blog'/>
        </div>
        <div>
          url:
          <input
            data-testid='url'
            value={url}
            onChange={event => setUrl(event.target.value)}
            placeholder='url to the blog'/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm