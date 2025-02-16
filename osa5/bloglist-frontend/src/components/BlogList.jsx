import Togglable from './Togglable'
import BlogForm from './AddBlog'
import Blog from './Blog'
import { useLoginValue } from '../reducers/LoginContext'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs, addBlog, addLike, removeBlog }) => {
  const currentUser = useLoginValue()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if ( blogs ) {
    blogs.sort((first, second) => second.likes - first.likes)
  }

  return(
    <div>
      <Togglable buttonLabel="new blog">
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogList