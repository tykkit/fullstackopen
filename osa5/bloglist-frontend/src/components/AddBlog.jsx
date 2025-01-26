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
            value={title}
            onChange={event => setTitle(event.target.value)}/>
        </div>
        <div>
          author:
          <input
            value={author}
            onChange={event => setAuthor(event.target.value)}/>
        </div>
        <div>
          url:
          <input
            value={url}
            onChange={event => setUrl(event.target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.PropTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm