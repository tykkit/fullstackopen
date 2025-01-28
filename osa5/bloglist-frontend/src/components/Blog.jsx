import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeHandler, removeHandler, currentUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showData, setShowData] = useState(false)

  const toggleData = () => {
    setShowData(!showData)
  }

  const manageLike = (event) => {
    event.preventDefault()
    likeHandler(blog)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    removeHandler(blog)
  }

  const buttonText = !showData
    ? 'view'
    : 'hide'

  const showDelButton = !currentUser || !(currentUser.username === blog.user.username)
    ? { display: 'none' }
    : { display: '' }

  if (!showData) {
    return(
      <div style={blogStyle} className='blogHidden'>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleData}>{buttonText}</button>
        </div>
      </div>
    )
  }

  return(
    <div style={blogStyle} className='blogShown'>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleData}>{buttonText}</button>
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        likes {blog.likes}
        <button onClick={manageLike}>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
      <button style={showDelButton} onClick={deleteBlog}>remove</button>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog