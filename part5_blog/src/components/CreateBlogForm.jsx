const CreateBlogForm = ({ handleCreate, title, author, url , handleAuthorChange, handleTitleChange, handleUrlChange }) => {
  return (
    <form onSubmit={handleCreate}>
      <div>
        title
        <input
          type="text"
          value={title}
          name="title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="url"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateBlogForm