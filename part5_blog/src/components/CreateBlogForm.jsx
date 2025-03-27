import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    addBlog({ title, url, author })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={handleCreate}>
      <div>
        title
        <input
          type="text"
          value={title}
          name="title"
          id="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="author"
          id="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="url"
          id="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit" id="create">create</button>
    </form>
  )
}

CreateBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default CreateBlogForm