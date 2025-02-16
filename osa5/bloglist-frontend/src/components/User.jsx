const User = ({ user }) => {
  console.log(user)
  const blogsOfUser = user.blogs

  if (!user) {
    return null
  }
  return(
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {blogsOfUser.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User