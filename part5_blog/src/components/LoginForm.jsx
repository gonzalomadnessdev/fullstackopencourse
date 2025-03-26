const LoginForm = ({ handleLogin, username, password, handlePasswordChange, handleUsernameChange }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
      username
        <input
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
      password
        <input
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm