const LOGGED_USER_KEY = "loggedUser"

const getLoggedUser = () => {
  const loggedUserStr = localStorage.getItem(LOGGED_USER_KEY)
  let loggedUser = null
  if(loggedUserStr !== null){
    loggedUser = JSON.parse(loggedUserStr)
  }

  return loggedUser
}

const setLoggedUser = (user) => {
  localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(user))
}

const removeLoggedUser = () => localStorage.removeItem(LOGGED_USER_KEY)

export default { getLoggedUser , setLoggedUser, removeLoggedUser }