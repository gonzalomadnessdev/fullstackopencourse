import { useState } from 'react'

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
    <div style={blogStyle} className='blog'>
      {blog.title}, {blog.author}
      <button type="button" onClick={() => setShow(!show)} id="toggle">{(show) ? 'hide': 'view'}</button>
      {show && <>
        <br /> likes: {blog.likes} <button type="button" id="likes" onClick={() => increaseLike(blog)}>like</button>
        <br /> {blog.url}
        <br /> {blog.user.name}
        {allowRemove && <><br /><button type="button" id="remove" onClick={() => removeBlog(blog)}>remove</button></>}
      </>}
    </div>
  )
}

export default Blog