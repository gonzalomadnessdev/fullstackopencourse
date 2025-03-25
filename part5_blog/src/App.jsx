import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import authService from './services/auth'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const loggedUser = authService.getLoggedUser()
    if (loggedUser !== null) {
      setUser(loggedUser)
    }
  }, [])

  useEffect(() => {
    if (user !== null) {
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      authService.setLoggedUser(user)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      sendErrorNotification(`${JSON.stringify(exception.response.data.error)}`)
    }
  }

  const handleLogout = () => {
    authService.removeLoggedUser()
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({ title, url, author })
      setBlogs([...blogs, blog])
      sendSuccessNotification('Blog created!')
      setAuthor('')
      setTitle('')
      setUrl('')
    } catch (exception) {
      sendErrorNotification(`${JSON.stringify(exception.response.data.error)}`)
    }
  }

  const sendSuccessNotification = (msj) => {
    setSuccessMessage(msj)
    setTimeout(()=>{setSuccessMessage(null)}, 1500)
  }

  const sendErrorNotification = (msj) => {
    setErrorMessage(msj)
    setTimeout(()=>{setErrorMessage(null)}, 1500)
  }

  return (
    (user === null) ? <>
      <h2>Log in to application</h2>

      <Notification message={successMessage} type={'success'}/>
      <Notification message={errorMessage} type={'error'}/>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
      :
    <div>
      <h2>blogs</h2>

      <Notification message={successMessage} type={'success'}/>
      <Notification message={errorMessage} type={'error'}/>

      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>

      <h2>create new</h2>

      <CreateBlogForm
        handleCreate={handleCreate}
        title={title}
        author={author}
        url={url}
        setAuthor={setAuthor}
        setTitle={setTitle}
        setUrl={setUrl}
      />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App