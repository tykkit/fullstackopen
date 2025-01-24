const BlogForm = ({title, author, url, titleSetter, authorSetter, urlSetter, addBlog}) => (
  <div>
    <form onSubmit={addBlog}>
      <div>
        title:
        <input 
        type="text" 
        value={title}
        name="title"
        onChange={({target}) => titleSetter(target.value)}/>  
      </div>
      <div>
        author:
        <input 
        type="text" 
        value={author}
        name="author"
        onChange={({target}) => authorSetter(target.value)}/>  
      </div>    
      <div>
        url:
        <input 
        type="text" 
        value={url}
        name="url"
        onChange={({target}) => urlSetter(target.value)}/>  
      </div>
      <button type="submit">create</button>
    </form>  
  </div>
)

export default BlogForm