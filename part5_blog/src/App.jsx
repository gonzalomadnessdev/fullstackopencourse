import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import authService from './services/auth'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const notificationComponentRef = useRef(null)

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
      notificationComponentRef.current.success('welcome!')
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notificationComponentRef.current.error(`${JSON.stringify(exception.response.data.error)}`)
    }
  }

  const handleLogout = () => {
    authService.removeLoggedUser()
    setUser(null)
  }

  const creatBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      setBlogs([...blogs, newBlog])
      notificationComponentRef.current.success('Blog created!')
    } catch (exception) {
      notificationComponentRef.current.error(`${JSON.stringify(exception.response.data.error)}`)
    }
  }

  return (
    <>
      <h2>{(user === null) ? 'Log in to application' : 'blogs'}</h2>
      <Notification ref={notificationComponentRef} />
      {
        (user === null) ? <>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        </>
          :
          <div>
            <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
            <Togglable buttonLabel={'new note'}>
              <>
                <h2>create new</h2>
                <CreateBlogForm
                  addBlog={creatBlog}
                />
              </>
            </Togglable>

            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
      }
    </>
  )
}

export default App