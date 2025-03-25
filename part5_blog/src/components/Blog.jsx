import { useState } from "react"

const Blog = ({ blog , increaseLike, removeBlog, allowRemove }) => {
  const [show, setShow] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}, {blog.author} 
        <button type="button" onClick={()=> setShow(!show)}>{(show) ? 'hide': 'view'}</button>
        {show && <>
          <br /> likes: {blog.likes} <button type="button" onClick={() => increaseLike(blog)}>like</button>
          <br /> {blog.url}
          <br /> {blog.user.name}
          {allowRemove && <><br /><button type="button" onClick={() => removeBlog(blog)}>remove</button></>}
        </>}
      </div>
    </div>
  )
}

export default Blog