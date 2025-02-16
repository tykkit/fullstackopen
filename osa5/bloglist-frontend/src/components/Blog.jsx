import { useState } from 'react'
import { useNotificationDispatch } from '../reducers/NotificationContext'

const Blog = ({ blog, likeHandler, removeHandler, currentUser, commentHandler }) => {
  const [comment, setComment] = useState('')
  const notifDispatch = useNotificationDispatch()

  if (!blog) {
    return null
  }
  const manageLike = (event) => {
    event.preventDefault()
    likeHandler.mutate(blog)
  }

  const comments = blog.comments
    ? blog.comments
    : null

  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      removeHandler.mutate(blog.id)
  }

  const addComment = (event) => {
    event.preventDefault()
    const newComment = {
      blog: blog.id,
      content: comment
    }
    commentHandler.mutate(newComment)
    console.log('added', comment)
    notifDispatch({
      type: 'SET_NOTIFICATION',
      payload: {
        message: `added comment ${comment} to blog ${blog.title}`
      }
    })
    setComment('')
  }

  const showDelButton =
    !currentUser || !(currentUser.username === blog.user.username)
      ? { display: 'none' }
      : { display: '' }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes
        <button onClick={manageLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <button style={showDelButton} onClick={deleteBlog}>
        remove
      </button>
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <input value={comment} onChange={(event) => setComment(event.target.value)}/>
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {comments &&
          comments.map(comment =>
            <li key={comment.id}>{comment.content}</li>
          )
        }
      </ul>
    </div>
  )
}

export default Blog
